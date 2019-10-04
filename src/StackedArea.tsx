import React from 'react'
import { StackedArea as D3StackedArea } from 'd3plus-react'

const StackedArea: React.FunctionComponent<{ data?: any; groupBy?: string[]; title: string }> = ({
  data,
  groupBy,
  title,
}) => {
  return (
    <D3StackedArea
      config={{
        data: data,
        groupBy: groupBy,
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
        title: title,

        titleConfig: { fontSize: 20, fontWeight: 600 },
      }}
      //ref={rstack}
    />
  )
}

export default StackedArea

//const rviz = useRef(null)
//const rstack = useRef(null)
/* useEffect(() => {
   ;(window as any).viz = rviz
   ;(window as any).stack = rstack
   console.log(year)
 }) */
