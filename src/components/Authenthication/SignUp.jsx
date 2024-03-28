import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getErrorMessage, validateEmail } from '../../utils/validate';
import api from '../../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Actions/authActions';
import Loading from '../Reusable/Loading ';


const SignUp = () => {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [Loadingopen, setLoadingopen] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const CreateUser = async () => {
    setLoadingopen(true)
    try {
      const response = await api.post('/user/otp/', { email: email });
      if (response.status === 200) {
        dispatch(login(response.data.key));
        setLoadingopen(false)
        navigate('/verify-otp');
      }
    } catch (error) {
      setLoadingopen(false)
      console.log(error);
      const errorMessages = getErrorMessage(error)
      const generalErrors = errorMessages.filter((error) => error.field === 'general' || error.field === error.field || error.field === 'name');
      if (generalErrors.length >= 0) {
        const newErrors = generalErrors.map(error => error.message);
        newErrors.forEach(error => toast.error(error));
      }
      else if (error.message) {
        toast.error(`${error.message || 'Somthing went wrong'}`)
      }
    }
  }

  return (
    <div className='m-5'>
      <div>
        <img src="/back.png" alt="" className='w-7' onClick={() => { navigate('/login') }} />
      </div>
      <div className='flex flex-col gap-2 py-6'>
        <p className='text-2xl font-medium font-poppins'>Enter your email</p>
        <p className='text-xs text-gray-400'>Hello , welcome to your account !</p>
      </div>
      <div className='flex border border-gray-400  gap-2 p-2 rounded-full'>
        <div className='bg-[#27ABE2] w-full rounded-full text-center text-white py-2'>Email</div>
        {/* <div className=' w-6/12 rounded-full text-center  py-2'>Phone</div> */}
      </div>
      <div className='py-8 flex flex-col gap-5'>
        <div className='flex flex-col gap-1'>
          <p className='text-xs text-gray-400'>Email Address*</p>
          <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='p-2 border outline-[#27ABE2] border-gray-300 w-full rounded-md' onBlur={() => validateEmail(email, setEmailError)} />
          <div className='pl-2 '>
            {emailError && <p className='text-red-500 text-xs font-medium'>{emailError}</p>}
          </div>
        </div>
      </div>
      <div>
        <p className='text-xs text-gray-500'>By Clicking “Sign Up” you agree to Our Terms and Conditions as well as Our Privacy Policy.</p>
      </div>
      <div className='py-10'>
        <button className='text-sm bg-[#27ABE2]  text-white py-3 rounded-md w-full' onClick={CreateUser}>Request OTP</button>
      </div>
      {Loadingopen && <Loading />}
      <ToastContainer />
    </div>
  )
}

export default SignUp
