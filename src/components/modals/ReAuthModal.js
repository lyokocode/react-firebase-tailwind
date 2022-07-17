import React from 'react'
import { reAuth, login } from '../../firebase'
import LoginForm from '../LoginForm'

const ReAuthModal = ({ close }) => {


    const handleSubmit = async (e, email, password) => {
        e.preventDefault()
        const result = await reAuth(password)
        close()
    }

    return (
        <div >
            <LoginForm handleSubmit={handleSubmit} noEmail={true} />
        </div>
    )
}

export default ReAuthModal