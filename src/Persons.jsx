import {gql, useLazyQuery} from '@apollo/client'
import { useEffect, useState } from 'react'

const FIND_PERSON = gql`
query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
        name
        phone
        id 
        address{
            street
            city
        }
    }
}
`
const Persons = ({persons}) => {
    const [getPerson, result] = useLazyQuery(FIND_PERSON)

    // Creamos un estado para guardar la persona que encontremos
    const [person, setPerson] = useState(null)

    useEffect(() => {
        if(result.data) {
            setPerson(result.data.findPerson)
        }
    }, [result])
    const showPerson = name => {
        getPerson({ variables: {nameToSearch: name} })
    }

    if(person) {
        return (
            <div>
                <h2>{person.name}</h2>
                <div>{person.address.street}, {person.address.city}</div>
                <div>{person.phone ? person.phone : 'Not Phone Number'}</div>
                <button onClick={()=> setPerson(null)}>Close</button>
            </div>
        )
    }
    if (persons === null) return null
    return (
        <div>
            <h2>Persons</h2>
            {persons.map(person => <div key={person.id} onClick={() => {showPerson(person.name)}}>{person.name} {person.phone}</div> )}
        </div>
    )
}

export default Persons