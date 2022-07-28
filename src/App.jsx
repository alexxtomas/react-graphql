import reactLogo from './assets/react.svg'
import './App.css'
import Persons from './Persons'
import PersonFrom from './PersonFrom'
import Notify from './Notify'
import { usePersons } from './persons/custom-hooks'
import { useState } from 'react'



function App() {
  const {data, error, loading} = usePersons()
  const [errorMessage, setErrorMessage] = useState(null)

  const notifyError = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  } 
  if (error) return <span style='color: red'>{error}</span>
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
      <PersonFrom notifyError={notifyError} />
    </div>
  )
}

export default App
