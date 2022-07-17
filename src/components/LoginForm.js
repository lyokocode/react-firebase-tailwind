import React from 'react'
import { useState } from 'react';

import { Link } from "react-router-dom"

const LoginForm = ({ handleSubmit, noEmail = false }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handle = e => {
        handleSubmit(e, email, password)
    }

    return (
        <>
            <form className="max-w-xl mx-auto grid gap-y-4 py-4" onSubmit={handle}>
                {!noEmail && (<div>
                    <label className="block text-sm font-medium text-gray-700"> e-posta</label>
                    <div className="mt-1">
                        <input className="shadow-sm focus:ring-indigo-500 block w-full sm:text-sm border-gray-500"
                            type="email" name="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>)}
                <div>
                    <label className="block text-sm font-medium text-gray-700"> parola</label>
                    <div className="mt-1">
                        <input className="shadow-sm focus:ring-indigo-500 block w-full sm:text-sm border-gray-500"
                            type="password" name="password" placeholder="*****" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className="m-auto">
                    <button className="cursor-pointer disabled:opacity-25 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        type='submit'>giriş yap
                    </button>
                </div>
                {!noEmail && (<p className="mx-auto flex items-center content-center">
                    hesabın yok mu?
                    <span className="text-blue-600"> <Link to="/signin">kayıt ol</Link></span>
                </p>)}
            </form>

        </>
    );
}

export default LoginForm