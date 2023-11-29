import { trpc } from "@/trpc"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const { mutate } = trpc.user.login.useMutation({
    onSuccess: (result) => {
      setEmail("")
      setPassword("")
      localStorage.setItem("userInfo", JSON.stringify(result.data))
      navigate("/")
    },
    onError: (error) => {
      console.log(error.message)
    },
  })

  const handleLogin = () => {
    mutate({
      email,
      password,
    })
  }

  return (
    <div>
      <div>
        <h2>Login</h2>
        <div>
          <label>email:</label>
          <input
            type="text"
            value={email}
            className="text-black"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            className="text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default LoginPage
