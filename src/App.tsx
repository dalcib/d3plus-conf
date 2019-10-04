import { useRef } from 'react'
import React from 'react'
import useStore from './useStore'
//import useStore from './useImmox'
import TreeMap from './TreeMap'
import StackedArea from './StackedArea'
import Form from './Form'
import { saveCSV } from './saveCSV'
import logo from './toptal.gif'
import { Context } from './useStore'
import countries from './json/partnerAreas.json'
import './App.css'

function App() {
  const colorConfig = useRef({})
  const { state, set } = useStore(colorConfig)

  return (
    <Context.Provider value={{ state, set }}>
      <div className="App">
        <header className="App-header">
          <h1>Gerador de Gráficos das Exportações do Agronegócio Brasileiro </h1>
          <h2>
            Gera mapas do tipo Treemap e Staked para dados do
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
        <Form /* {...{ set, state }} */ />
        {state.data && state.data.length ? (
          <div>
            <span>Dados carregados, com {state.data.length} linhas.</span>
            <button onClick={() => saveCSV(state.data, state.country)}>
              Fazer download dos dados
            </button>
          </div>
        ) : null}
        <hr />
        <div>
          <br />
          <span>{/*  {state.country} - - {state.data.length} -{state.loading.toString()} */}</span>
          {state.country === '0' /* !state.trade && !state.loading */ ? (
            <span>
              <h1>=> Selecione um país </h1>
            </span>
          ) : null}
          {/* state.country && */ state.loading ? (
            <span>
              <h1>Aguarde! Carregando</h1>
              <img src={logo} className="App-logo" alt="logo" />
            </span>
          ) : null}
          {state.data.length !== 0 && !state.loading ? (
            <div>
              <TreeMap
                {...{
                  data: state.data,
                  subdiv: state.subdiv,
                  groupBy: ['cmdDesc2', 'cmdDesc4', 'cmdDesc6'],
                  title:
                    'Exports from Brazil to ' +
                    countries.results.find(item => item.id === state.country)!.text,
                }}
              />
              <br />
              <br />
              <StackedArea
                {...{
                  data: state.data,
                  groupBy: ['cmdDesc2', 'cmdDesc4', 'cmdDesc6'],
                  title:
                    'Exports from Brazil to ' +
                    countries.results.find(item => item.id === state.country)!.text,
                }}
              />
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
            3301, 3501, 3502, 3503, 3504, 3505, 4101, 4102, 4103, 4301, 5001, 5002, 5003, 5101,
            5102, 5103, 5201, 5202, 5203, 5301, 5302
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
    </Context.Provider>
  )
}

export default App
