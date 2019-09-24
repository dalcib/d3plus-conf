import { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { confData } from './confdata'

function confUrl(countryId: string, aggLevel: number): string | null {
  return !!parseInt(countryId, 10) || countryId === 'all'
    ? 'https://comtrade.un.org/api/get?max=50000&type=C&head=M&px=HS&fmt=json&' +
        'freq=A&ps=2018%2C2017%2C2016%2C2015%2C2014&p=76&rg=1&cc=AG' +
        aggLevel +
        '&r=' +
        countryId
    : null
}

const useStore = (colorConfig: any) => {
  const initialState: State = {
    year: 2018,
    aggLevel: 4,
    agronegocio: true,
    country: '0',
    subdiv: false,
    url: null,
    data: [],
    trade: null,
    loading: true,
  }

  const [state, set] = useImmer<State>(initialState)

  useEffect(() => {
    async function fetchUrl() {
      try {
        if (state.url) {
          set(s => {
            s.loading = true
            s.data = []
            s.trade = null
          })
          const res = await fetch(state.url, { cache: 'no-cache' })
          const json = await res.json()
          set(s => {
            s.trade = json
          })
          console.log('Fetch', json.dataset.length)
        }
      } catch (e) {
        console.log(e)
      }
      set(s => {
        s.loading = false
      })
    }
    fetchUrl()
  }, [state.url, state.aggLevel, set])

  useEffect(() => {
    if (state.trade && state.trade.length) {
      set(s => {
        s.data = confData(s.trade, s.agronegocio)
      })
    }
  }, [state.trade, state.agronegocio, set])

  useEffect(() => {
    set(s => {
      s.url = confUrl(state.country, state.aggLevel)
    })
  }, [state.country, state.aggLevel, set])

  useEffect(() => {
    colorConfig.current = state.subdiv ? { color: 'cmdDesc2' } : {}
  }, [state.subdiv, colorConfig, state])

  return {
    state,
    set,
  }
}

export default useStore
