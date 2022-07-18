import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { logout, auth, emailVerification, addTodo, deleteTodo } from '../firebase'
import { logout as logoutHandle } from '../store/auth'
import { FiSettings } from "react-icons/fi"
import { AiOutlineClose } from "react-icons/ai"
import Login from './Login'
import UpdateProfile from '../components/UpdateProfile'
import { useState } from "react"

const Home = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [todo, setTodo] = useState("")

    const { todos } = useSelector(state => state.todos)

    const submitHandle = async e => {
        e.preventDefault()
        await addTodo({
            todo,
            uid: user.uid
        })
        setTodo("")
    }

    const handleDelete = async id => {
        await deleteTodo(id)
    }

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
            <section className="w-screen h-screen bg-red-50 ">
                <main className="  p-10 relative bg-red-50 flex items-start justify-evenly"  >
                    <nav className="flex items-center justify-between  p-5  w-screen " >
                        <div className="flex items-center ml-10">
                            {auth.currentUser.photoURL && <img src={auth.currentUser.photoURL} alt={user.displayName} className="w-20 h-20 rounded-full" />}
                            <h4 className="mx-10 flex gap-x-4">

                                {
                                    user.displayName ? `Hoşgeldin - ${user.displayName} 🎉🎉🎉` : ` oturum ${user.email} tarafından açıldı. Lütfen profili düzenleyiniz!`
                                }

                            </h4>
                        </div>
                        <div className="flex items-center ">
                            {!user.emailVerified &&
                                <button className="cursor-pointer mr-24 disabled:opacity-25 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleVerification}>e posta onayla</button>}
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
                </main>

                <div className="p-4 mt-4 bg-indigo-400 w-5/12  mx-auto flex flex-col  justify-center relative h-[70vh] overflow-auto">
                    <form onSubmit={submitHandle} className="flex gap-x-4 rounded-2xl w-full sticky top-0" >
                        <input type="text" onChange={e => setTodo(e.target.value)} placeholder=" todo gir" value={todo}
                            className="rounded-2xl px-6 mx-6shadow-sm focus:ring-indigo-500 block  w-full sm:text-sm border-gray-500" />
                        <button disabled={!todo} className="cursor-pointer disabled:opacity-25 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            ekle
                        </button>
                    </form>
                    <ul className="mt-4 gap-y-2 h-[55vh] flex flex-col items-start justify-start ">
                        {todos.map(todo => (
                            <li className="p-4 w-full bg-indigo-100 text-sm text-indigo-500 flex justify-between items-center" key={todo.id}>
                                {todo.todo} - {todo.id}
                                <button className="cursor-pointer disabled:opacity-25 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => handleDelete(todo.id)}
                                >
                                    sil
                                </button>
                            </li>
                        ))}
                        {
                            todos.length === 0 && (
                                <li className="p-4 w-full bg-orange-100 text-sm text-orange-500 flex justify-between items-center">
                                    Hiç todo eklemedin!!
                                </li>
                            )
                        }
                    </ul>
                </div>
            </section>
        )
    }
    else {
        return (
            <Login />
        )
    }

}

export default Home