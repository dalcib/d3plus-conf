

//https://comtrade.un.org/api/get?max=50000&type=C&head=M&px=HS&freq=A&r=699&ps=2018%2C2017%2C2016%2C2015%2C2014&p=76&rg=1&cc=AG6&fmt=json

import { confData} from './data'
const comtrade = require('./comtrade.json')
const fs = require('fs')

const tradeAgri = confData({ data: comtrade })

//console.log(tradeAgri)

fs.writeFileSync('tradeAgri.json', JSON.stringify(tradeAgri))

export {}