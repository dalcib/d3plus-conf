import { useEffect, useRef, useState } from 'react'
import React from 'react'
import { saveAs } from 'file-saver'
import { confData } from './confdata'
import TreeMap from './TreeMap'
import StackedArea from './StackedArea'
import Form from './Form'
import countries from './json/partnerAreas.json'
import logo from './toptal.gif'
import './App.css'

const JSONtoCSV = (arr: any[], columns: string[] = Object.keys(arr[0]), delimiter = ',') =>
  [
    columns.join(delimiter),
    ...arr.map(obj =>
      columns.reduce(
        (acc, key) => `${acc}${!acc.length ? '' : delimiter}"${!obj[key] ? '' : obj[key]}"`,
        ''
      )
    ),
  ].join('\n')

function confUrl(countryId: string, aggLevel: number) {
  return !!parseInt(countryId, 10) || countryId === 'all'
    ? 'https://comtrade.un.org/api/get?max=50000&type=C&head=M&px=HS&fmt=json&' +
        'freq=A&ps=2018%2C2017%2C2016%2C2015%2C2014&p=76&rg=1&cc=AG' +
        aggLevel +
        '&r=' +
        countryId
    : null
}

function App() {
  //const rviz = useRef(null)
  //const rstack = useRef(null)
  const colorConfig = useRef({})

  const [year, setYear] = useState<number | null>(null)
  const [aggLevel, setAggLevel] = useState<number>(4)
  const [agronegocio, setAgronegocio] = useState<boolean>(true)
  const [country, setCountry] = useState<string>('0')
  const [subdiv, setSubdiv] = useState<boolean>(false)
  const [url, setUrl] = useState(confUrl(country, aggLevel))
  const [data, setData] = useState<any[]>([])
  const [trade, setTrade] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUrl() {
      try {
        if (url) {
          setLoading(true)
          setData([])
          setTrade(null)
          const res = await fetch(url, { cache: 'no-cache' })
          const json = await res.json()
          setTrade(json)
          console.log('Fetch', json.dataset.length)
        }
      } catch (e) {
        console.log(e)
      }
      setLoading(false)
    }
    fetchUrl()
  }, [url, aggLevel])

  useEffect(() => {
    if (trade && trade.dataset.length) {
      setData(confData(trade, agronegocio))
    }
  }, [trade, agronegocio])

  useEffect(() => {
    setUrl(confUrl(country, aggLevel))
  }, [country, aggLevel])

  useEffect(() => {
    colorConfig.current = subdiv ? { color: 'cmdDesc2' } : {}
  }, [subdiv])

  const saveCSV = () => {
    const CSV = JSONtoCSV(data)
    var blob = new Blob([CSV], { type: 'text/plain;charset=utf-8' })
    saveAs(
      blob,
      'comtrade-brazil-' + countries.results.find(item => item.id === country)!.text + '.csv'
    )
  }

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
      <Form
        {...{
          aggLevel,
          setAggLevel,
          agronegocio,
          setAgronegocio,
          country,
          setCountry,
          subdiv,
          setSubdiv,
        }}
      />
      {data && data.length ? (
        <div>
          <span>Dados carregados, com {data.length} linhas.</span>
          <button onClick={() => saveCSV()}>Fazer download dos dados</button>
        </div>
      ) : null}
      <hr />
      <div>
        <br />
        {data.length === 0 && !loading ? (
          <span>
            <h1>=> Selecione um país </h1>
          </span>
        ) : null}
        {data.length === 0 && loading ? (
          <span>
            <h1>Aguarde! Carregando</h1>
            <img src={logo} className="App-logo" alt="logo" />
          </span>
        ) : null}
        {data.length !== 0 && !loading ? (
          <div>
            <TreeMap {...{ data, subdiv, setYear, country }} />
            <br />
            <br />
            <StackedArea {...{ data, country }} />
          </div>
        ) : null}
      </div>
      <br />
      <br />
      <br /> <hr /> <br />
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

/* useEffect(() => {
   ;(window as any).viz = rviz
   ;(window as any).stack = rstack
   console.log(year)
 }) */
