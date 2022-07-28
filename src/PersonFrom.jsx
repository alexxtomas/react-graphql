// Imporamos el hook useMutation para realizar la mutacion
import { gql, useMutation } from "@apollo/client"
import { useState } from "react"

// Creamos la mutacion que queremos realizar
const CREATE_PERSON = gql`
mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
    addPerson(
        name: $name
        phone: $phone
        street: $street
        city: $city
    ) {
        name
        phone
        address {
            street
            city
        }
        id
    }
}
`

const PersonFrom = () => {
    // Creamos los estados para el formulario
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')

    // Utilizamos el useMutation que le pasamos la mutacion que queremos hacer y tenemos el createPerson para crear a la persona
    const [createPerson] = useMutation(CREATE_PERSON)

    const handleSubmit = event => {
        event.preventDefault()
        // Creamos la persona y le damos el valor a las variables
        createPerson( {variables: {name, phone, street, city} })
        setName('')
        setPhone('')
        setStreet('')
        setCity('')
    }

    return (
        <div>
            <h2>Create new person</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Name" value={name} onChange={(evt) => setName(evt.target.value)} />
                <input placeholder="Phone" value={phone} onChange={(evt) => setPhone(evt.target.value)} />
                <input placeholder="Street" value={street} onChange={(evt) => setStreet(evt.target.value)} />
                <input placeholder="City" value={city} onChange={(evt) => setCity(evt.target.value)} />
                <button>Add Person</button>
            </form>
        </div>
    )
}

export default PersonFrom