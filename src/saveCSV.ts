import { saveAs } from 'file-saver'
import countries from './json/partnerAreas.json'

const JSONtoCSV = (arr: any[], columns: string[] = Object.keys(arr[0]), delimiter = ',') =>
  [
    columns.join(delimiter),
    ...arr.map(obj =>
      columns.reduce(
        (acc, key) => `${acc}${!acc.length ? '' : delimiter}"${!obj[key] ? '' : obj[key]}"`,
        ''
      )
    ),
  ].join('\n')

export const saveCSV = (data: any, country: string) => {
  const CSV = JSONtoCSV(data)
  var blob = new Blob([CSV], { type: 'text/plain;charset=utf-8' })
  saveAs(
    blob,
    'comtrade-brazil-' + countries.results.find(item => item.id === country)!.text + '.csv'
  )
}
