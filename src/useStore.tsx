import { useEffect /* , useMemo  */, createContext } from 'react'
import { produce, immerable } from 'immer'
import { useImmer } from 'use-immer'
import { confData } from './confdata'

function confUrl(countryId: string, aggLevel: number): string | null {
  return parseInt(countryId, 10) > 0 || countryId === 'all'
    ? 'https://comtrade.un.org/api/get?max=50000&type=C&head=M&px=HS&fmt=json&' +
        'freq=A&ps=2018%2C2017%2C2016%2C2015%2C2014&p=76&rg=1&cc=AG' +
        aggLevel +
        '&r=' +
        countryId
    : null
}

export class State {
  [immerable] = true
  year = 2018
  aggLevel = 4
  agronegocio = true
  country = '0'
  subdiv = false
  trade = null
  loading = false
  get url() {
    return confUrl(this.country, this.aggLevel) || null
  }
  get data() {
    return this.trade ? confData(this.trade, this.agronegocio) : []
  }
  subdivToggle() {
    this.subdiv = !this.subdiv
  }
  increment() {
    return produce(this, d => {
      d.aggLevel += 2
    })
  }
}

const initialState = new State()

const useStore = (colorConfig: any) => {
  const [state, set] = useImmer<State>(initialState)

  useEffect(() => {
    async function fetchUrl() {
      if (state.url) {
        try {
          set(s => {
            s.loading = true
          })
          const res = await fetch(state.url, { cache: 'no-cache' })
          const json = await res.json()
          set(s => {
            s.trade = json
            s.loading = false
          })
          console.log(
            'Fetch',
            //state.data.length,
            json && json.dataset && json.dataset.length,
            state.url
          )
        } catch (e) {
          console.log(e)
          set(s => {
            s.loading = false
          })
        }
      }
    }
    fetchUrl()
  }, [state.url, state.aggLevel, set])

  /*   useEffect(() => {
    console.log('trade', state.trade && state.trade.length)
    if (state.trade && state.trade.length) {
      set(s => {
        s.data = confData(s.trade, s.agronegocio)
      })
    }
  }, [state.trade, state.agronegocio, set]) */

  /*   useEffect(() => {
    set(s => {
      s.url = confUrl(state.country, state.aggLevel)
    })
  }, [state.country, state.aggLevel, set]) */

  useEffect(() => {
    colorConfig.current = state.subdiv ? { color: 'cmdDesc2' } : {}
  }, [state.subdiv, colorConfig, state])

  return {
    state,
    set,
  }
}

export default useStore

export const Context = createContext({} as {
  state: State
  set: (f: (draft: State) => void | State) => void
})
