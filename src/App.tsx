import { useEffect, useRef, useState } from 'react'
import React from 'react'
import { Treemap, StackedArea } from 'd3plus-react'
import { confData } from './data'
//import tradeAgri from './comtrade.json'
//import { useFetch } from './useFetch'

import countries from './partnerAreas.json'
import './App.css'

const countriesList = countries.results.sort((a, b) => {
  const at = a.text.toUpperCase()
  const bt = b.text.toUpperCase()
  return at < bt ? -1 : at > bt ? 1 : 0
})

function App() {
  const confUrl = (countryId: string, aggLevel: number) =>
    'https://comtrade.un.org/api/get?max=50000&type=C&head=M&px=HS&fmt=json&' +
    'freq=A&ps=2018%2C2017%2C2016%2C2015%2C2014&p=76&rg=1&cc=AG' +
    aggLevel +
    '&r=' +
    countryId
  const rviz = useRef(null)
  const rstack = useRef(null)
  const colorConfig = useRef({})
  //const agriTrade = useRef([])
  const [year, setYear] = useState<number | null>(null)
  const [aggLevel, setAggLevel] = useState<number>(4)
  const [agronegocio, setAgronegocio] = useState<boolean>(true)
  const [country, setCountry] = useState<string>('699')
  const [url, setUrl] = useState(confUrl(country, aggLevel))
  const [subdiv, setSubdiv] = useState<boolean>(false)

  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    async function fetchUrl() {
      try {
        const res = await fetch(url)
        const json = await res.json()
        setData(confData(json, agronegocio))
      } catch {}
      setLoading(false)
    }
    fetchUrl()
  }, [url, aggLevel])
  //@ts-ignore
  //const [trade, loading] = /* tradeAgri */ useFetch(url, aggLevel, agronegocio)

  /* useEffect(() => {
    //@ts-ignore
    if (!loading) agriTrade.current = confData(trade, agronegocio)
  }, [url, trade, agronegocio, loading]) */
  useEffect(() => {
    setUrl(confUrl(country, aggLevel))
  }, [country, aggLevel])

  useEffect(() => {
    ;(window as any).viz = rviz
    ;(window as any).stack = rstack
    console.log(rviz, rstack)
  })

  useEffect(() => {
    colorConfig.current = subdiv ? { color: 'cmdDesc2' } : {}
  }, [subdiv])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gerador de Gráficos das Exportações do Agronegócio Brasileiro </h1>
        <h2>
          Gera mapas do tipo Treemap e Staked para dados do{' '}
          <a
            href="https://comtrade.un.org"
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            COMTRADE
          </a>
        </h2>
      </header>
      <br />
      <br />
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
        {/* <button>Fazer download e gerar os gráficos</button> */}
      </div>
      <hr />
      <br />
      {loading ? (
        <span>
          <h1>Aguarde! Carregando</h1>
        </span>
      ) : (
        <div>
          <Treemap
            config={{
              groupBy: ['cmdDesc2', 'cmdDesc4', 'cmdDesc6'],
              sum: 'value',
              time: 'yr',
              downloadButton: true,
              legend: false,
              total: (d: any) => d.value,
              totalConfig: {
                text: (d: any) => d.text,
                fontSize: 12,
                fontWeight: 600,
              },
              height: 600,
              data: data,
              depth: subdiv ? 1 : 0,
              title:
                'Exports from Brazil to ' +
                countries.results.find(item => item.id === country)!.text,
              titleConfig: { fontSize: 20, fontWeight: 600 },
              timelineConfig: {
                on: {
                  end: (d: Date[] | Date) => {
                    if (d !== undefined) {
                      const time = Array.isArray(d)
                        ? d.map(item => item.getFullYear())
                        : [d.getFullYear()]
                      setYear(time[0])
                    }
                    return true
                  },
                },
              },
              ...colorConfig.current,
            }}
            ref={rviz}
          />
          <br />
          <br />
          <StackedArea
            config={{
              data: data,
              groupBy: ['cmdDesc2', 'cmdDesc4', 'cmdDesc6'],
              y: 'value',
              x: 'yr',
              legend: false,
              depth: 0,
              downloadButton: true,
              downloadPosition: 'top',
              xConfig: { fontSize: 20 },
              shapeConfig: { fontSize: 20 },
              labelConfig: { fontSize: 20 },
              height: 600,
              title:
                'Exports from Brazil to ' +
                countries.results.find(item => item.id === country)!.text,
              titleConfig: { fontSize: 20, fontWeight: 600 },
            }}
            ref={rstack}
          />
        </div>
      )}
      <br />
      <br />
      <br />
      <hr />
      <br />
      <div className="App-subheader">
        <h3>Códigos HS do Acordo SPS Agricultura</h3>
        <p>
          01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
          23, 24
        </p>
        <p>290543, 290544, 380910, 382360</p>
        <p>
          3301, 3501, 3502, 3503, 3504, 3505, 4101, 4102, 4103, 4301, 5001, 5002, 5003, 5101, 5102,
          5103, 5201, 5202, 5203, 5301, 5302
        </p>
        <h3>Códigos HS Adicionais para o Agronegócio</h3>
        <p>44, 45, 46, 47, 48, 94</p>
        <p>
          4101, 4102, 4103, 4104, 4105, 4106, 4107, 4108, 4109, 4110, 4111, 4112, 4113, 4114, 4115
        </p>
        <p>4201, 4202, 4203, 4204, 4205, 4206, 4301, 4302, 4303</p>
        <p>6401, 6402, 6403, 6404, 6405, 6406, 3201, 3203, 6005, 4001</p>
        <p>5304, 5305, 5306, 5307, 5308, 5309, 5310, 5311</p>
      </div>
      <br />
      <h4>
        Código Fonte{' '}
        <a href="https://github.com/dalcib/d3plus-conf">https://github.com/dalcib/d3plus-conf</a>
      </h4>
    </div>
  )
}

export default App
