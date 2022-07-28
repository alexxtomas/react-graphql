import reactLogo from './assets/react.svg'
import './App.css'
import {gql, useQuery} from '@apollo/client'
import Persons from './Persons'
import PersonFrom from './PersonFrom'

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
  // Usamos el poollInterval pera que realice una peticion cada dos segundos 
  const {data, error, loading} = useQuery(ALL_PERSONS, {pollInterval: 2000})

  if (error) return <span style='color: red'>{error}</span>
  return (
    <div className="App">
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
      <PersonFrom />
    </div>
  )
}

export default App
