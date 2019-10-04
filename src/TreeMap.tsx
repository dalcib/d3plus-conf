import React, { useEffect, useRef } from 'react'
import { Treemap } from 'd3plus-react'

const TreeMap: React.FunctionComponent<{
  data: any[]
  subdiv: boolean
  groupBy: string[]
  title: string
}> = ({ data, subdiv, groupBy, title }) => {
  const colorConfig = useRef({})

  useEffect(() => {
    colorConfig.current = subdiv ? { color: groupBy[0] } : {}
  }, [subdiv, groupBy])

  return (
    <Treemap
      config={{
        groupBy: groupBy,
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
        data: data,
        depth: subdiv ? 1 : 0,
        title: title,
        titleConfig: { fontSize: 20, fontWeight: 600 },
        /* timelineConfig: {
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
        }, */
        ...colorConfig.current,
      }}
      /* ref={rviz} */
    />
  )
}

export default TreeMap
