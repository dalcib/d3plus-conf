import React from 'react'
import countries from './json/partnerAreas.json'

const countriesList = countries.results.sort((a, b) => {
  const at = a.text.toUpperCase()
  const bt = b.text.toUpperCase()
  return at < bt ? -1 : at > bt ? 1 : 0
})

type Props = {
  aggLevel: number
  setAggLevel: (level: number) => void
  agronegocio: boolean
  setAgronegocio: (level: boolean) => void
  country: string
  setCountry: (level: string) => void
  subdiv: boolean
  setSubdiv: (level: boolean) => void
}

const Form: React.FunctionComponent<Props> = ({
  aggLevel,
  setAggLevel,
  agronegocio,
  setAgronegocio,
  country,
  setCountry,
  subdiv,
  setSubdiv,
}) => {
  return (
    <div className="App-subheader">
      <div className="box">
        País Importador :
        <select
          value={country}
          onChange={(e: React.FormEvent<HTMLSelectElement>) => setCountry(e.currentTarget.value)}
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
            checked={aggLevel === 4}
            onChange={() => setAggLevel(4)}
          />
          HS4
        </label>
        <label>
          <input
            type="radio"
            value="6"
            name="aggLevel"
            checked={aggLevel === 6}
            onChange={() => setAggLevel(6)}
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
            checked={agronegocio === false}
            onChange={() => setAgronegocio(false)}
          />
          Acordo SPS
        </label>
        <label>
          <input
            type="radio"
            value="agronegocio"
            name="agronegocio"
            checked={agronegocio === true}
            onChange={() => setAgronegocio(true)}
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
            checked={subdiv === true}
            onChange={() => setSubdiv(!subdiv)}
          />
          Mostrar subdivisões
        </label>
      </div>
      <br />
    </div>
  )
}

export default Form
