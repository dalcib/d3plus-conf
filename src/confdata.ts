import hsDesc from './json/hsDesc.json'

type hsDesc = { [key: string]: string }

type trade = {
  yr: number
  cmdCode: string
  cmdDescE: string
  cmdCode2: string
  cmdDesc2: string
  cmdCode4: string
  cmdDesc4: string
  cmdCode6: string
  cmdDesc6: string
  qtCode: number
  qtDesc: string
  TradeQuantity: number
  TradeValue: number
}

export function confData(data: any, agro: boolean = true) {
  const aggrLevel = data.dataset[0].aggrLevel

  var trade: trade[] = data.dataset
    .map(
      ({ yr, cmdCode, cmdDescE, qtCode, qtDesc, TradeQuantity, TradeValue, ...rest }: trade) => ({
        yr,
        cmdCode,
        cmdDescE,
        value: TradeValue,
      })
    )
    .map(({ cmdCode, cmdDescE, ...rest }: trade) => ({
      cmdCode2: cmdCode.substr(0, 2),
      cmdCode4: cmdCode.substr(0, 4),
      cmdCode6: cmdCode,
      cmdDescE,
      ...rest,
    }))
    .map(({ cmdCode2, cmdCode4, cmdCode6, cmdDescE, ...rest }: trade) => ({
      cmdCode2,
      cmdDesc2: hsDesc[cmdCode2],
      cmdCode4,
      cmdDesc4: hsDesc[cmdCode4],
      cmdCode6,
      cmdDesc6: cmdCode6 + '- ' + cmdDescE,
      ...rest,
    }))

  type na = string[]
  // prettier-ignore
  const sps: na = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]
  const sps6: na = ['290543', '290544', '380910', '382360']
  // prettier-ignore
  const sps4: na = ["3301", "3501", "3502", "3503", "3504", "3505", "4101", "4102", "4103", "4301", "5001", "5002", "5003", "5101", "5102", "5103", "5201", "5202", "5203", "5301", "5302"]
  const agro2: na = ['44', '45', '46', '47', '48', '94']
  // prettier-ignore
  const agro4a: na = ["4101", "4102", "4103", "4104", "4105", "4106", "4107", "4108", "4109", "4110", "4111", "4112", "4113", "4114", "4115"]
  const agro4b: na = ['4201', '4202', '4203', '4204', '4205', '4206', '4301', '4302', '4303']
  // prettier-ignore
  const agro4c: na = ['6401', '6402', '6403', '6404', '6405', '6406', '3201', '3203', '6005', '4001']
  const agro4d: na = ['5304', '5305', '5306', '5307', '5308', '5309', '5310', '5311']
  const agro4: na = [agro4a, agro4b, agro4c, agro4d].flat()

  const tradeAgri = trade
    .filter(
      item =>
        sps.includes(item.cmdCode2) ||
        sps4.includes(item.cmdCode4) ||
        sps6.includes(item.cmdCode6) ||
        (agro2.includes(item.cmdCode2) && agro) ||
        (agro4.includes(item.cmdCode4) && agro)
    )
    .map(({ cmdCode2, cmdCode4, cmdCode6, ...rest }) => ({ ...rest }))
    .map(({ cmdDesc6, ...rest }) => {
      if (aggrLevel === 4) {
        return { ...rest }
      } else {
        return { cmdDesc6, ...rest }
      }
    })

  return tradeAgri
}

//https://comtrade.un.org/api/get?max=50000&type=C&head=M&px=HS&freq=A&r=699&ps=2018%2C2017%2C2016%2C2015%2C2014&p=76&rg=1&cc=AG6&fmt=json

//import { confData } from './confdata'
//const comtrade = require('./json/comtrade.json')
//const fs = require('fs')
//const tradeAgri = confData({ data: comtrade })
//fs.writeFileSync('tradeAgri.json', JSON.stringify(tradeAgri))
