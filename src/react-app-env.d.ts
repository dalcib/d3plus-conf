/// <reference types="react-scripts" />

type State = {
  year: number
  aggLevel: number
  agronegocio: boolean
  country: string
  subdiv: boolean
  url: string | null
  data: any[]
  trade: any[] | null
  loading: boolean
}

type SetState = (f: (draft: State) => void | State) => void
