import React from 'react'
import { StackedArea as D3StackedArea } from 'd3plus-react'
import countries from './json/partnerAreas.json'

const StackedArea: React.FunctionComponent<{ data: any; country: string }> = ({
  data,
  country,
}) => (
  <D3StackedArea
    config={{
      data: data,
      groupBy: ['cmdDesc2', 'cmdDesc4', 'cmdDesc6'],
      y: 'value',
      x: 'yr',
      legend: false,
      depth: 0,
      downloadButton: true,
      downloadPosition: 'top',
      xConfig: {
        shapeConfig: {
          labelConfig: {
            fontSize: () => 20,
          },
        },
      },
      shapeConfig: { fontSize: 20 },
      labelConfig: { fontSize: 20 },
      height: 600,
      title: 'Exports from Brazil to ' + countries.results.find(item => item.id === country)!.text,
      titleConfig: { fontSize: 20, fontWeight: 600 },
    }}
    //ref={rstack}
  />
)

export default StackedArea
