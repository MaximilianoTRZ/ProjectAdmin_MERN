import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'


const Registrar = () => {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = e => {
    e.preventDefault();
    
    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: "All fields are required",
        error: true
      })
      return
    }
  }

  const { msg } = alerta


  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize'>
      Sing Up {''}
      <span className='text-slate-700'>to manage your projects</span> 
    </h1>

    <form 
      className='my-10 border border-slate-200 bg-white shadow-xl rounded-lg px-10 py-5'
      onSubmit={handleSubmit}
    >
      {msg && <Alerta alerta={alerta} />}

      <div className='my-5'>
        <label 
          className='uppercase text-gray-600 block text-xl font-bold' 
          htmlFor='name'
        >Name</label>
        <input 
          id='name'
          type="name" 
          placeholder='your name' 
          className='w-full mt-3 p-3 border border-slate-400 rounded-xl bg-gray-200'
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
      </div>
      <div className='my-5'>
        <label 
          className='uppercase text-gray-600 block text-xl font-bold' 
          htmlFor='email'
        >Email</label>
        <input 
          id='email'
          type="email" 
          placeholder='example@email.com' 
          className='w-full mt-3 p-3 border border-slate-400 rounded-xl bg-gray-200'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className='my-5'>
        <label 
          className='uppercase text-gray-600 block text-xl font-bold' 
          htmlFor='password'
        >Password</label>
        <input 
          id='password'
          type="password" 
          placeholder='your password' 
          className='w-full mt-3 p-3 border border-slate-400 rounded-xl bg-gray-200'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className='my-5'>
        <label 
          className='uppercase text-gray-600 block text-xl font-bold' 
          htmlFor='password2'
        >Repeat Password</label>
        <input 
          id='password2'
          type="password" 
          placeholder='your password again' 
          className='w-full mt-3 p-3 border border-slate-400 rounded-xl bg-gray-200'
          value={repetirPassword}
          onChange={e => setRepetirPassword(e.target.value)}
        />
      </div>

      <nav className='lg:flex lg:justify-center'>
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to="/"
        >Already have an account? Sing In</Link>
      </nav>

      <input 
        type="submit" 
        value="Sing Up"
        className='bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded-xl 
        hover:cursor-pointer hover:bg-sky-800 transition-colors'   
      />

    </form>
    </>
  )
}

export default Registrar