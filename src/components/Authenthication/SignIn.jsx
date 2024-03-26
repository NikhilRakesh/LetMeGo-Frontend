import React from 'react'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const navigate = useNavigate()

  return (
    <div className='m-5'>
      <div>
        <img src="/back.png" alt="" className='w-7' onClick={() => { navigate('/login') }} />
      </div>
      <div className='flex flex-col gap-2 py-6'>
        <p className='text-2xl font-medium font-poppins'>Let’s Get Your Login!</p>
        <p className='text-xs text-gray-400'>Welcome Back your Account.!</p>
      </div>
     
      <div className='py-8 flex flex-col gap-5'>
        <div className='flex flex-col gap-1'>
          <p className='text-xs text-gray-400'>Phone / Email Address*</p>
          <input type="email" name='email' className='p-2 border outline-[#27ABE2] border-gray-300 w-full rounded-md' />
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-xs text-gray-400'>Password*</p>
          <input type="password" name='password' className='p-2 outline-[#27ABE2] border border-gray-300 w-full rounded-md' />
        </div>
      </div>
      <div className='flex justify-end'>
        <p className='text-xs font-semibold'>Forgot Password</p>
      </div>
      <div className='py-10'>
        <button className='text-sm bg-[#27ABE2]  text-white py-3 rounded-md w-full' onClick={() => { navigate('/verify-otp') }}>Sgin in</button>
      </div>
    </div>
  )
}

export default SignIn
