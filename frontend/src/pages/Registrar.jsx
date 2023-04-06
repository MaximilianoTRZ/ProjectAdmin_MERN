import React from 'react'
import { Link } from 'react-router-dom'


const Registrar = () => {
  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize'>
      Sing Up {''}
      <span className='text-slate-700'>to manage your projects</span> 
    </h1>

    <form className='my-10 border border-slate-200 bg-white shadow-xl rounded-lg px-10 py-5'>
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
        />
      </div>

      <nav className='lg:flex lg:justify-between'>
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to="registrar"
        >Don't have an account? Sing Up</Link>
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to="olvide-password"
        >Forgot my password</Link>
      </nav>

      <input 
        type="submit" 
        value="Sing In"
        className='bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded-xl 
        hover:cursor-pointer hover:bg-sky-800 transition-colors'   
      />

    </form>
    </>
  )
}

export default Registrar