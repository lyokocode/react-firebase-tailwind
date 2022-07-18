import React, { useState } from 'react'
import { update, resetPassword } from '../firebase'
import { useSelector } from 'react-redux'
import { setUserData } from '../utils'

const UpdateProfile = () => {

    const { user } = useSelector(state => state.auth)
    const [displayName, setDisplayName] = useState(user.displayName || "")
    const [avatar, setAvatar] = useState(user.photoURL || "")
    const [password, setPassword] = useState("")


    const handleSubmit = async e => {
        e.preventDefault()
        await update({
            displayName,
            photoURL: avatar
        })
        setUserData()
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()
        const result = await resetPassword(password)
        if (result) {
            setPassword("")

        }
    }

    return (
        <section className='z-10 w-2/5 p-10 h-[70vh]  bg-indigo-300 rounded-lg flex flex-col items-center justify-center absolute top-28 right-32'>
            <h6 className='w-full p-4 text-sm '>(Oturum ({user.email}) tarafından açıldı)</h6>
            <form onSubmit={handleSubmit} className="w-96  flex flex-col items-center justify-center m-5">
                <h1>kullanıcı bilgilerini güncelle</h1>
                <input className="shadow-sm focus:ring-indigo-500 rounded block w-full px-5 sm:text-sm border-gray-500"
                    type="text" placeholder="ismini güncelle" value={displayName} onChange={(e) => setDisplayName(e.target.value)} /> <br />
                <button className="cursor-pointer disabled:opacity-25 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    type='submit'>güncelle </button>
            </form>
            <form onSubmit={handleSubmit} className="w-96  flex flex-col  items-center justify-center m-5">
                <h1>kullanıcı fotoğrafını güncelle</h1>
                <input className="shadow-sm focus:ring-indigo-500 block rounded w-full px-5 sm:text-sm border-gray-500"
                    type="text" placeholder="fotoğrafı güncelle" value={avatar} onChange={(e) => setAvatar(e.target.value)} /> <br />
                <button className="cursor-pointer disabled:opacity-25 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    type='submit'>güncelle </button>
            </form>
            <form onSubmit={handleResetPassword} className="w-96 flex flex-col items-center justify-center m-5">
                <h1>şifreyi değiştir</h1>
                <input className="shadow-sm focus:ring-indigo-500 block w-full rounded px-5 sm:text-sm border-gray-500"
                    type="text" placeholder="şifreyi değiştir" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                <button className="cursor-pointer disabled:opacity-25 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={!password} type='submit'>güncelle </button>
            </form>
        </section>


    )
}

export default UpdateProfile