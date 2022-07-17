import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { logout, auth, emailVerification } from '../firebase'
import { logout as logoutHandle } from '../store/auth'
import { FiSettings } from "react-icons/fi"
import { AiOutlineClose } from "react-icons/ai"
import Login from './Login'
import UpdateProfile from '../components/UpdateProfile'
import { useState } from "react"

const Home = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        await logout()
        dispatch(logoutHandle)
        navigate("/login", {
            replace: true
        })
    }

    const { user } = useSelector(state => state.auth)


    const handleVerification = async () => {
        await emailVerification()
    }

    const [update, setUpdate] = useState(false)


    if (user) {
        return (
            <>
                <section className="w-screen h-screen  p-10 relative bg-red-50 flex items-start justify-evenly"  >
                    <nav className="flex items-center justify-between  p-5  w-screen " >
                        <div className="flex items-center ml-10">

                            {auth.currentUser.photoURL && <img src={auth.currentUser.photoURL} className="w-20 h-20 rounded-full" />}
                            <h4 className="mx-10 flex gap-x-4">
                                Oturum ({user.email}) tarafından açıldı
                            </h4>
                        </div>

                        <div>
                            {!user.emailVerified &&
                                <button onClick={handleVerification}>e posta onayla</button>}
                            <button className="h-8 rounded text-neutral-700 mr-10" onClick={() => setUpdate(!update)}>
                                {
                                    update ? <AiOutlineClose className="h-8 w-8" /> : <FiSettings className="h-8 w-8" />
                                }
                            </button>
                        </div>
                    </nav>
                    <div>
                        {
                            update &&
                            <UpdateProfile />
                        }
                    </div>
                    <div className="   fixed bottom-10 right-20 ">
                        <button className="p-5 h-8 rounded px-4 text-sm text-white bg-indigo-700 flex  items-center "
                            onClick={handleLogout}>
                            çıkış yap
                        </button>
                    </div>
                </section>
            </>
        )
    }
    else {
        return (
            <Login />
        )
    }

}

export default Home