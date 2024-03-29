import React from 'react'

const NuevoPassword = () => {
  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize'>
      Reset  {' '}
      <span className='text-slate-700'> password</span> 
    </h1>

    <form className='my-10 border border-slate-200 bg-white shadow-xl rounded-lg px-10 py-5'>
      
      <div className='my-5'>
        <label 
          className='uppercase text-gray-600 block text-xl font-bold' 
          htmlFor='password'
        >New Password</label>
        <input 
          id='password'
          type="password" 
          placeholder='write your new password here' 
          className='w-full mt-3 p-3 border border-slate-400 rounded-xl bg-gray-200'
        />
      </div>
    

      <input 
        type="submit" 
        value="Confirm new password"
        className='bg-sky-700 w-full mb-5 py-3 text-white uppercase font-bold rounded-xl 
        hover:cursor-pointer hover:bg-sky-800 transition-colors'   
      />

    </form>
    </>
  )
}

export default NuevoPassword