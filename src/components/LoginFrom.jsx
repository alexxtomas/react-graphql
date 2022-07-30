import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "../users/graphql-mutations"


const LoginFrom = ({notifyError, setToken}) => {
 const [username, setUsername] = useState('')
 const [password, setPassword] = useState('')
 const [getToken] = useMutation(LOGIN)




 const handleSubmit = (evt) => {
    evt.preventDefault()
    getToken({variables: {username, password}})
        .then(({data}) => {
            let {value: token} = data.login
            setToken(token)
            window.localStorage.setItem('loggedUserToken', token)
        })
        .catch(e => notifyError(e.message))
    


    // window.localStorage.setItem('loggedUserToken', JSON.stringify(token))

    setUsername('')
    setPassword('')
 }
 
  return (
    <div>
        <h2>Loggin Form</h2>
         <form onSubmit={handleSubmit} >
            <div>
            <label>
                Username
                <input 
                    placeholder="Username"
                    value={username}
                    onChange={(evt) => setUsername(evt.target.value) }
                /> 
            </label>
            </div>
            <div>
            <label>
                Password
                <input 
                    placeholder="Password"
                    value={password}
                    onChange={(evt) => setPassword(evt.target.value) }
                    type='password'
                /> 
            </label>
            </div>
            <button>Loggin</button>
        </form>
    </div>
   
  )
}

export default LoginFrom