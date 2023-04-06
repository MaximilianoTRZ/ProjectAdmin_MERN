import React from 'react'
import { Link } from 'react-router-dom'

const OlvidePassword = () => {
  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize'>
      Password {''}
      <span className='text-slate-700'>recovery</span> 
    </h1>

    <form className='my-10 border border-slate-200 bg-white shadow-xl rounded-lg px-10 py-5'>
      <div className='lg:flex  block text-center my-5 text-slate-500 uppercase text-sm'>
          We are gonna send you and email with instructions to recovery your password account
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
        />
      </div>

      <nav className='lg:flex lg:justify-center'>
        <Link
          className='block text-center my-5 text-slate-500 uppercase text-sm'
          to="/"
        >I've just remembered</Link>
      </nav>

      <input 
        type="submit" 
        value="Send recovery instrunctions"
        className='bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded-xl 
        hover:cursor-pointer hover:bg-sky-800 transition-colors'   
      />

    </form>
    </>
  )
}

export default OlvidePassword