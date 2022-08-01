import { gql } from '@apollo/client/core'
/* Añadims el fragment donde extraemos todos los dataos de Person y se lo pasamos
como si fuese un spread operator a la query allPersons */

export const PERSON_DETAIL_FRAGMENT = gql`
  fragment PersonDetails on Person {
    name
    address {
      street
      city
    }
    phone
    id
  }
`
export const ALL_PERSONS = gql`
  query {
    allPersons {
      ...PersonDetails
    }
  }

  ${PERSON_DETAIL_FRAGMENT}
`
