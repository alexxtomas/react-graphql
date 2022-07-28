// Importamos el hook LazyQuery que se diferencia con useQuery en que nosotros le decimos cuando debe realizar la query
import {gql, useLazyQuery} from '@apollo/client'
import { useEffect, useState } from 'react'

// Como hacer una query con parametros
/*Definimos el nombre de la query findPersonByName y le decimos que recibira un parametro que sera una variable llamada nameToSearch y
que sera de tipo String y obligatorio  */
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
    /*Utilizamos el useLazyQuery que es un array donde el primer elemento se utiliza para realizar la query y en el segundo tendriamos 
    el resultado de la query */
    const [getPerson, result] = useLazyQuery(FIND_PERSON)

    // Creamos un estado para guardar la persona que encontremos
    const [person, setPerson] = useState(null)

    // Utilizamos el useEffect para si tenemos en el result la data de alguna persona añadirla a nuestro estado de react
    useEffect(() => {
        if(result.data) {
            setPerson(result.data.findPerson)
        }
    }, [result])
    // Creamos una funcion que recibe el nombre a buscar y le indicamos al getPersons la variable previamente definida el valor que tendra
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
            {/*Cuando se haga click en el div ejecutamos el showPerson con el name que sera lo que el valor del parametro del getPersons */}
            {persons.map(person => <div key={person.id} onClick={() => {showPerson(person.name)}}>{person.name} {person.phone}</div> )}
        </div>
    )
}

export default Persons