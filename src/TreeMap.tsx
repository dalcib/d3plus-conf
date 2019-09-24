import React, { useEffect, useRef } from 'react'
import { Treemap } from 'd3plus-react'
import countries from './json/partnerAreas.json'

const TreeMap: React.FunctionComponent<{
  data?: any[]
  subdiv?: boolean
  setYear?: any
  country?: string
  state: State
  set: SetState
}> = ({ data, subdiv, setYear, country, state, set }) => {
  const colorConfig = useRef({})

  useEffect(() => {
    colorConfig.current = subdiv ? { color: 'cmdDesc2' } : {}
  }, [subdiv])

  return (
    <Treemap
      config={{
        groupBy: ['cmdDesc2', 'cmdDesc4', 'cmdDesc6'],
        sum: 'value',
        time: 'yr',
        downloadButton: true,
        downloadConfig: { type: 'jpg' },
        legend: false,
        total: (d: any) => d.value,
        totalConfig: {
          text: (d: any) => d.text,
          fontSize: 12,
          fontWeight: 600,
          padding: 5,
        },
        height: 600,
        data: state.data,
        depth: state.subdiv ? 1 : 0,
        title:
          'Exports from Brazil to ' +
          countries.results.find(item => item.id === state.country)!.text,
        titleConfig: { fontSize: 20, fontWeight: 600 },
        timelineConfig: {
          on: {
            end: (d: Date[] | Date) => {
              if (d !== undefined) {
                const time = Array.isArray(d)
                  ? d.map(item => item.getFullYear())
                  : [d.getFullYear()]
                set(s => {
                  s.year = time[0]
                })
              }
              return true
            },
          },
        },
        ...colorConfig.current,
      }}
      /* ref={rviz} */
    />
  )
}

export default TreeMap
