import { useState } from "react"
import "./MyForm.css"

interface UserInterface {
  user: {
    name: string
    email: string
    bio: string
    func: string
  }
}

const MyForm = ({ user }: UserInterface) => {
  const [name, setName] = useState(user ? user.name : "")
  const [email, setEmail] = useState(user ? user.email : "")
  const [bio, setBio] = useState(user ? user.bio : "")
  const [func, setFunc] = useState(user ? user.func : "")

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setName("")
    setEmail("")
    setBio("")
    setFunc("")
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Digite seu nome"
            onChange={handleName}
            value={name}
          />
        </div>
        <label>
          <span>E-mail:</span>
          <input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Bio:</span>
          <textarea
            name="bio"
            onChange={(e) => setEmail(e.target.value)}
            value={bio}
          ></textarea>
        </label>
        <label>
          <span>Função no sistema</span>
          <select
            name="func"
            onChange={(e) => setEmail(e.target.value)}
            value={func}
          >
            <option value="dev">Developer</option>
            <option value="diretor">Diretor</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <input type="submit" value="Enviar" />
      </form>
    </div>
  )
}

export default MyForm
