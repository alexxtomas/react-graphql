import reactLogo from './assets/react.svg'
import './App.css'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import LoginFrom from './components/LoginFrom'
import Notify from './components/Notify'
import { usePersons } from './persons/custom-hooks'
import { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'



function App() {
  const {data, error, loading} = usePersons()
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('loggedUserToken'))
  // Lo utilizamos para limpiar la cache
  const client = useApolloClient()

  useEffect(() => {
    const savedToken = window.localStorage.getItem('loggedUserToken')
    if(savedToken) setToken(savedToken)
  }, [])

  const notifyError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)

    
  } 
  const logout = () => {
      setToken(null)
      localStorage.clear()
      // Limpiamos la cache
      client.resetStore()
    }
  if (error) return <span style={{color: 'red'}}>{error.message}</span>
  return (
    <div className="App">
      <Notify errorMessage={errorMessage}/>
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {
      loading 
      ? <p>Loading...</p> 
      : <Persons persons={data?.allPersons}/>
      }
      {
        token 
        ? 
          <>
           <button onClick={logout}>Logout</button>
            <PhoneForm notifyError={notifyError}/>
            <PersonForm notifyError={notifyError} />
          </>
        
        : 
        <>
        <LoginFrom setToken={setToken} notifyError={notifyError}/>

        </>
      }
      
    </div>
  )
}

export default App
