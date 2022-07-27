import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// Importamos el ApolloProvider para que  nuestro cliente este disponible en todos los componentes
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache, gql} from '@apollo/client'

const client = new ApolloClient({
  
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
})





ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
