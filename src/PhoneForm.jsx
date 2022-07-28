import { useMutation } from "@apollo/client"
import {  useState } from "react"
import { EDIT_NUMBER } from "./persons/graphql-mutations"



const PhoneForm = ({notifyError}) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const [changeNumber, result] = useMutation(EDIT_NUMBER, {
        onError: error => {
            const errorPath = error.graphQLErrors[0].path
            if(errorPath[0] === 'editNumber' && errorPath[1] === 'name') notifyError('Cannot edit number of a person who does not exist')
            else notifyError(error.graphQLErrors[0].message)
        }
    })


    const handleSubmit = event => {
        event.preventDefault()
        
        changeNumber( {variables: {name, phone} })
    
        setName('')
        setPhone('') 
    }

    return (
        <div>
            <h2>Edit Phone Number</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Name" value={name} onChange={(evt) => setName(evt.target.value)} />
                <input placeholder="Phone" value={phone} onChange={(evt) => setPhone(evt.target.value)} />
                <button>Change Phone</button>
            </form>
        </div>
    )
}

export default PhoneForm