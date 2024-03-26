import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const OtpSuccess = () => {
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user);

    const Onclick = () => {
        if (!user?.vehicle && !user?.exist) {
            navigate('/create-profile')
        }else if(user?.exist&&!user?.vehicle){
            navigate('/add-vechicles')
        }else {
            navigate('/home')
        }
    }
    return (
        <div className='m-5'>
            <div className='flex justify-center py-10'>
                <img src="/otp success.png" alt="" />
            </div>
            <div>
                <p className='text-center text-3xl font-semibold font-syne'>Congratulations</p>
            </div>
            <div className='py-3'>
                <p className='text-xs text-gray-400 text-center'>Welcome to Let Me Go</p>
            </div>
            <div className='py-10'>
                <button className='text-sm bg-[#27ABE2]  text-white py-3 rounded-md w-full ' onClick={Onclick} >Done</button>
            </div>
        </div>
    )
}

export default OtpSuccess
