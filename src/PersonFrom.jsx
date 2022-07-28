import { useMutation } from "@apollo/client"
import { useState } from "react"
// Importamos la query que queremos hacer el refetch cuando se haga la mutacion
import { ALL_PERSONS } from "./persons/graphql-queries"
import { CREATE_PERSON } from "./persons/graphql-mutations"



const PersonFrom = ({notifyError}) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')

    const [createPerson] = useMutation(CREATE_PERSON, {
        // Realizamos el refetch de la query cuando se realice la mutacion 
        refetchQueries: [ {query: ALL_PERSONS}],
        // Decimos que hacer cuando suceda un error
        onError: (error) => {
            notifyError(error.graphQLErrors[0].message)
        }
    })

    const handleSubmit = event => {
        event.preventDefault()
        
        if (name === '') createPerson( {variables: { phone, street, city} })
        else if (phone === '') createPerson( {variables: {name, street, city} })
        else if (street === '') createPerson( {variables: {name, phone, city} })
        else if (city === '') createPerson( {variables: {name, phone, street} })
        else createPerson( {variables: {name, phone, street, city} })
    
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