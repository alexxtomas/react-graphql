import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// Importamos el ApolloClient HttpLink InMemoryCache y gql
import {ApolloClient, HttpLink, InMemoryCache, gql} from '@apollo/client'

// Inicializamos el cliente
const client = new ApolloClient({
  /* apolo client utiliza una cache para guardar la informacion y no tener que volverla a pedir al servidor la cache mas tipica es la 
  cache en memoria */
  cache: new InMemoryCache(),
  // link le pasamos con que se tiene que conectar normalmente la uri suele venir el el .env debido a que cambia si estamos en produccion
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
})

// Configuramos la query que queremos hacer al servidor
const query = gql`
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

// Realizamos la query a query se le tiene que pasar un objeto que tiene la propiedad query y devuelve una promesa
client.query({ query })
  .then(res => console.log(res.data))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
