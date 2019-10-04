import React, { useContext } from 'react'
import countries from './json/partnerAreas.json'
import { Context } from './useStore'

const countriesList = countries.results.sort((a, b) => {
  const at = a.text.toUpperCase()
  const bt = b.text.toUpperCase()
  return at < bt ? -1 : at > bt ? 1 : 0
})

type Props = {
  aggLevel?: number
  setAggLevel?: (level: number) => void
  agronegocio?: boolean
  setAgronegocio?: (level: boolean) => void
  country?: string
  setCountry?: (level: string) => void
  subdiv?: boolean
  setSubdiv?: (level: boolean) => void
  /*   state: State
  set: SetState */
}

const Form: React.FunctionComponent<Props> = () => {
  const { state, set } = useContext(Context)
  return (
    <div className="App-subheader">
      <div className="box">
        País Importador :
        <select
          value={state.country}
          onChange={(e: React.FormEvent<HTMLSelectElement>) => {
            const value: string = e.currentTarget.value
            set(s => {
              s.country = value
            })
            e.persist()
          }}
        >
          {countriesList.map(item => (
            <option value={item.id} key={item.id}>
              {item.text}
            </option>
          ))}
        </select>
        <br />
      </div>
      <div className="box">
        Nível de Agregação:
        <label>
          <input
            type="radio"
            value="4"
            name="aggLevel"
            checked={state.aggLevel === 4}
            onChange={() =>
              set(s => {
                s.aggLevel = 4
              })
            }
          />
          HS4
        </label>
        <label>
          <input
            type="radio"
            value="6"
            name="aggLevel"
            checked={state.aggLevel === 6}
            onChange={() =>
              set(s => {
                s.aggLevel = 6
              })
            }
          />
          HS6
        </label>
        <br />
      </div>
      <div className="box">
        Produtos:
        <label>
          <input
            type="radio"
            value="sps"
            name="agronegocio"
            checked={state.agronegocio === false}
            onChange={() =>
              set(s => {
                s.agronegocio = false
              })
            }
          />
          Acordo SPS
        </label>
        <label>
          <input
            type="radio"
            value="agronegocio"
            name="agronegocio"
            checked={state.agronegocio === true}
            onChange={() =>
              set(s => {
                s.agronegocio = true
              })
            }
          />
          Agronegócio
        </label>
        <br />
      </div>
      <div className="box">
        <label>
          <input
            type="checkbox"
            value="4"
            name="subdiv"
            checked={state.subdiv === true}
            onChange={() => {
              set(s => {
                //s.subdiv = !s.subdiv
                s.subdivToggle()
                //state.increment()
              })
            }}
          />
          Mostrar subdivisões
        </label>
      </div>
      <br />
    </div>
  )
}

export default Form
