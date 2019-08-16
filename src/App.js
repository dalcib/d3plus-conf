import React, { useEffect, useRef, useState } from 'react'
import { Treemap, StackedArea } from 'd3plus-react'
import tradeAgri from './tradeAgri.json'
import { json } from 'd3-fetch'

const config = {
  data: tradeAgri,
  groupBy: ['cmdDesc2', 'cmdDesc4', 'cmdDesc6'],
  sum: 'value',
  title: 'Exports Brazil to India',
  time: 'yr',
  downloadButton: true,
  downloadPosition: 'top',
  dev: true,
  //color: 'cmdDesc2',
  legend: false,
  total: d => d.value,
  totalConfig: {
    text: d => d.text,
  },
}

function useFetch(url) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  async function fetchUrl() {
    const jsonData = await json(url)
    setData(jsonData)
    setLoading(false)
  }
  useEffect(() => {
    fetchUrl()
  }, [])
  return [data, loading]
}
export { useFetch }

//let viz = null

function App() {
  const rviz = useRef(null)
  const [year, setYear] = useState('')
  const [depth, setDepth] = useState(0)
  useEffect(() => {
    console.log(rviz)
    window.viz = rviz
  })
  return (
    <div className="App">
      <Treemap
        config={{
          depth: depth,
          timelineConfig: {
            on: {
              end: d => {
                if (d !== undefined) {
                  const time = Array.isArray(d)
                    ? d.map(item => item.getFullYear())
                    : [].concat(d.getFullYear())
                  setYear(time)
                }
                return true
              },
            },
          },
          ...config,
        }}
        ref={rviz}
        forceUpdate={false}
      />
      <p onClick={() => setDepth(1)}>{year}</p>
      {/* <input type="number" min="0" max="2" value={depth} onChange={v => setDepth(v)} />
      <button>Depth</button>
      <p onClick={() => setDepth(1)}>Depth</p>
       */}
      <StackedArea
        config={{
          data: tradeAgri,
          groupBy: ['cmdDesc2', 'cmdDesc4', 'cmdDesc6'],
          y: 'value',
          x: 'yr',
          legend: false,
          depth: 0,
          downloadButton: true,
          downloadPosition: 'top',
        }}
      />
    </div>
  )
}

export default App

//https://comtrade.un.org/api/get?max=50000&type=C&head=M&px=HS&freq=A&r=699&ps=2018%2C2017%2C2016%2C2015%2C2014&p=76&rg=1&cc=AG6&fmt=json

/* const comtrade = require('./comtrade.json')

const hsDesc = require('./hsDesc.json')

var trade = comtrade.dataset
  .map(({ yr, cmdCode, cmdDescE, qtCode, qtDesc, TradeQuantity, TradeValue, ...rest }) => ({
    yr,
    cmdCode,
    value: TradeValue,
  }))
  .map(({ cmdCode, ...rest }) => ({
    cmdCode2: cmdCode.substr(0, 2),
    cmdCode4: cmdCode.substr(0, 4),
    cmdCode6: cmdCode,
    ...rest,
  }))
  .map(({ cmdCode2, cmdCode4, cmdCode6, ...rest }) => ({
    cmdCode2,
    cmdDesc2: hsDesc[cmdCode2],
    cmdCode4,
    cmdDesc4: hsDesc[cmdCode4],
    cmdCode6,
    cmdDesc6: hsDesc[cmdCode6],
    ...rest,
  }))

// prettier-ignore
const sps = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]
const sps6 = ['290543', '290544', '380910', '382360']
// prettier-ignore
const sps4 = ["3301", "3501", "3502", "3503", "3504", "3505", "4101", "4102", "4103", "4301", "5001", "5002", "5003", "5101", "5102", "5103", "5201", "5202", "5203", "5301", "5302"]
const agro2 = ['44', '45', '46', '47', '48', '94']
// prettier-ignore
const agro4a = ["4101", "4102", "4103", "4104", "4105", "4106", "4107", "4108", "4109", "4110", "4111", "4112", "4113", "4114", "4115"]
const agro4b = ['4201', '4202', '4203', '4204', '4205', '4206', '4301', '4302', '4303']
const agro4c = ['6401', '6402', '6403', '6404', '6405', '6406', '3201', '3203', '6005', '4001']
const agro4d = ['5304', '5305', '5306', '5307', '5308', '5309', '5310', '5311']
const agro4 = [agro4a, agro4b, agro4c, agro4d].flat()

const tradeAgrix = trade
  .filter(
    item =>
      sps.includes(item.cmdCode2) ||
      sps4.includes(item.cmdCode4) ||
      sps6.includes(item.cmdCode6) ||
      agro2.includes(item.cmdCode2) ||
      agro4.includes(item.cmdCode4)
  )
  .map(({ cmdCode2, cmdCode4, cmdCode6, ...rest }) => ({ ...rest }))
 */
