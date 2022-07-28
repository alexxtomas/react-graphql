import reactLogo from './assets/react.svg'
import './App.css'
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
  const {data, error, loading} = useQuery(ALL_PERSONS)

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
