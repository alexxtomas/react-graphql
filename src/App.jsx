import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
// Importamos el hook useQuery
import {gql, useQuery} from '@apollo/client'
import Persons from './Persons'

const ALL_PERSONS = gql`
  query {
    allPersons {
      id
      name
      phone
      address {
        street
        city
      }

    }
  }
`

function App() {
  /* Utilizamos el useQuery y le pasamos la query que queremos realizar dentro de result tenemos el resultado de la query */
  const {data, error, loading} = useQuery(ALL_PERSONS)

  // Si hay un error mostramos el error
  if (error) return <span style='color: red'>{error}</span>
  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {
        // Si el loading no se ha completado mostramos Loading... y si no mostramos el componente Persons
      loading 
      ? <p>Loading...</p> 
      : <Persons persons={data?.allPersons}/>
      }
      
    </div>
  )
}

export default App
