import { useEffect, useState } from 'react'
import { confData } from './data'

function useFetch(url: string, aggLevel: number, agronegocio: boolean) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchUrl() {
      try {
        const res = await fetch(url)
        const json = await res.json()
        setData(confData(json, agronegocio))
      } catch {}
      setLoading(false)
    }
    fetchUrl()
  }, [url, aggLevel, agronegocio])
  return [data, loading]
}
export { useFetch }
