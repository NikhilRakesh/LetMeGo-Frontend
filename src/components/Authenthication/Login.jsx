import React from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
const Login = () => {

    const navigate = useNavigate()
    return (
        <div className="bg-cover bg-center min-h-screen mx-5 my-10 flex flex-col items-center justify-center gap-5 slide-up" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 1.3)), url('/pattern.png')" }}>
            <div className='flex justify-center'>
                <img src="/lmg.png" alt="" className='w-4/12' />
            </div>
            <div>
                <p className='text-2xl font-bold font-poppins text-center'>Welcome to Let Me Go</p>
            </div>
            <div>
                <p className='text-xs text-gray-400 text-center'>Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus.</p>
            </div>
            <div className='flex justify-center'>
                <button className='text-white  bg-[#31C5F4] px-20 py-2 rounded-md' onClick={() => { navigate('/Sign-Up') }} >Sign up</button>
            </div>
            <div>
                <p className='text-xs text-[#2B3984] font-medium '>Already have an account?<span onClick={() => { navigate('/Sign-Up') }} className='text-xs text-[#27ABE2]'> Sign In </span></p>
            </div>
        </div>
    )
}

export default Login
