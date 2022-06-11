import React from "react"
import MyForm from "./components/MyForm"

function App() {
  return (
    <div className="App">
      <h1>Forms</h1>
      <MyForm
        user={{
          name: "José",
          email: "josepaiva@gmail.com",
          bio: "Sou Develpor Jr",
          func: "admin",
        }}
      />
    </div>
  )
}

export default App
