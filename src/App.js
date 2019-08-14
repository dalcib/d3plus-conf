import React, { useEffect } from 'react'
//import d3plus from 'd3plus'
import { Treemap as D3 } from 'd3plus-react'

/* const viz = new Treemap()
console.log(viz.config(), TreemapComp.defaultProps)
 */

//console.log(d3plus.Plot().config())

const sdata = [
  { value: 100, name: 'alpha' },
  { value: 70, name: 'beta' },
  { value: 40, name: 'gamma' },
  { value: 15, name: 'delta' },
  { value: 5, name: 'epsilon' },
  { value: 1, name: 'zeta' },
]

const config = {
  data: sdata,
  size: d => d.value,
  groupBy: 'name',
  //text: 'name',
  //labels: { align: 'right', valign: 'top' },
  //font: { family: 'Arial' },
  title: 'Tree Map',
}

let viz = null

function App() {
  useEffect(() => {
    console.log(viz)
  })
  return (
    <div className="App">
      <D3 config={config} ref={comp => (viz = comp)} />
    </div>
  )
}

export default App
