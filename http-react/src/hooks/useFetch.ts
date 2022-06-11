import { useState, useEffect } from "react"

import { ProductsInterface } from "../App"

export const useFetch = (api: string) => {
  const [data, setData] = useState<ProductsInterface[] | null>(null)
  const [loading, setLoading] = useState(false)

  const [config, setConfig] = useState<{} | null>(null)
  const [method, setMethod] = useState<string | null>(null)
  const [callFetch, setCallFetch] = useState(false)
  const [ID, setID] = useState<number | null>(null)

  const httpConfig = (method: string, id?:number, data?: {}) => {
    if(method === "POST") {
      setConfig({
       method,
       headers: {
        "Content-type": "application/json"
       },
       body: JSON.stringify(data)
      })

      setMethod(method)
    }

    if(method === "DELETE") {
      setConfig({
        method,
      })
      setID(id as number)
      setMethod(method)
    }
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const res = await fetch(api)
      const json = await res.json()

      setData(json)

      setLoading(false)
    }
  
    fetchData()
  }, [api, callFetch])

  useEffect(() => {
    const httpRequest = async () => {
      if(method === "POST") {
        let fetchOptions: [string, {}] = [api, config as {}]
        const res = await fetch(...fetchOptions)
        const json = await res.json()

        setCallFetch(json)
      }
      if(method === "DELETE") {
        let fetchOptions: [string, {}] = [`${api}/${ID}`, config as {}]
        const res = await fetch(...fetchOptions)
        const json = await res.json()

        setCallFetch(json)
      }
  }
    httpRequest()
  }, [config, method, api])
  

  return { data, httpConfig, loading }
}