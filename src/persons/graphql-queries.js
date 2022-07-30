import { gql } from '@apollo/client/core'
export const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      address {
        street
        city
      }
      phone
      id
    }
  }
`
