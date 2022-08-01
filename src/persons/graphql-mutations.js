import { gql } from '@apollo/client/core'
// Importamos el fragmenot y lo utilizamos en la mutacion CREATE:PERSON Y EDIT_NUMNER
import { PERSON_DETAIL_FRAGMENT } from './graphql-queries'
export const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String
  ) {
    addPerson(name: $name, phone: $phone, street: $street, city: $city) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAIL_FRAGMENT}
`
export const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAIL_FRAGMENT}
`
