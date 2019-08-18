// Type definitions for d3plus-react 0.5
// Project: https://d3plus.org
// Definitions by: dalcib <https://github.com/dalcib>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'd3plus-react' {
  import { Component } from 'react'

  interface VizConfig {}

  export interface Config extends VizConfig {}

  interface Props {
    config: Config
    dataFormat?: (json: object[], data?: string, headers?: string) => object[]
    linksFormat?: (path: string, formatter: (d: object) => object) => object[]
    nodesFormat?: (path: string, formatter: (d: object) => object) => object[]
    topojsonFormat?: (path: string, formatter: (d: object) => object) => object[]
  }

  export class AreaPlot extends Component<Props> {}
  export class BarChart extends Component<Props> {}
  export class BumpChart extends Component<Props> {}
  export class Donut extends Component<Props> {}
  export class Geomap extends Component<Props> {}
  export class LinePlot extends Component<Props> {}
  export class Network extends Component<Props> {}
  export class Pack extends Component<Props> {}
  export class Pie extends Component<Props> {}
  export class Plot extends Component<Props> {}
  export class Priestley extends Component<Props> {}
  export class Radar extends Component<Props> {}
  export class Rings extends Component<Props> {}
  export class Sankey extends Component<Props> {}
  export class StackedArea extends Component<Props> {}
  export class Tree extends Component<Props> {}
  export class Treemap extends Component<Props> {}
}
