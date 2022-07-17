import { register } from "../firebase"
import { useState } from 'react';
import { Link } from "react-router-dom"

function Signin() {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    const user = await register(email, password)
  }

  return (
    // <section className='container'>
    //   <main className='signin-content'>
    //     <form className='signin-form' onSubmit={handleSubmit}>
    //       <input type="text" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
    //       <input type="password" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
    //       <button disabled={!email || !password} type='submit'>kayıt ol</button>
    //     </form>
    //     <p>
    //       hesabın var mı?
    //       <Link to="/login">Giriş yap</Link>
    //     </p>
    //   </main>
    //   <main className='show-content'>
    //     <h2>Todo oluştur</h2>
    //   </main>
    // </section>
    <>
      <form className="max-w-xl mx-auto grid gap-y-4 py-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700"> e-posta</label>
          <div className="mt-1">
            <input className="shadow-sm focus:ring-indigo-500 block w-full sm:text-sm border-gray-500"
              type="email" name="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700"> parola</label>
          <div className="mt-1">
            <input className="shadow-sm focus:ring-indigo-500 block w-full sm:text-sm border-gray-500"
              type="password" name="password" placeholder="*****" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        <div className="m-auto">
          <button className="cursor-pointer disabled:opacity-25 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={!email || !password} type='submit'>kayıt ol
          </button>
        </div>
        <p className="mx-auto flex items-center content-center">
          hesabın var mı?
          <span className="text-blue-600"> <Link to="/login">Giriş yap</Link></span>
        </p>
      </form>

    </>
  );
}

export default Signin;
