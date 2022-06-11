import "./App.css"

import React, { useState } from "react"

import { useFetch } from "./hooks/useFetch"

export interface ProductsInterface {
  id: number
  name: string
  price: number
}

const api = "http://localhost:3000/products"

function App() {
  const [products, setProducts] = useState<ProductsInterface[]>([])

  const { data: itemsProducts, httpConfig, loading } = useFetch(api)

  const [price, setPrice] = useState<number>()
  const [name, setName] = useState("")

  // useEffect(() => {
  //   async function getProducts() {
  //     const res = await fetch(api)
  //     const data = await res.json()

  //     setProducts(data)
  //   }

  //   getProducts()
  // }, [])

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    const product = {
      name,
      price,
    }

    // const res = await fetch(api, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(product),
    // })

    // const newProduct = await res.json()

    // setProducts((prevProducts) => [...prevProducts, newProduct])
    httpConfig("POST", undefined, product)
  }

  const handleDelete = (id: number) => {
    httpConfig("DELETE", id)
  }

  return (
    <div className="App">
      <h1>Lista de Produtos</h1>
      {loading ? (
        <p>Carregando dados...</p>
      ) : (
        <div>
          {itemsProducts?.map((product) => (
            <div key={product.id}>
              {product.name} - R$ {product.price}
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Nome:</p>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          <p>Price:</p>
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.valueAsNumber)}
          />
        </label>
        {loading && <input type="submit" disabled value="Await" />}
        {!loading && <input type="submit" value="create" />}
      </form>
    </div>
  )
}

export default App
