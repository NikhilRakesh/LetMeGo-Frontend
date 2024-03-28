import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api, { get_api } from '../../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../Actions/authActions';
import { getErrorMessage } from '../../utils/validate';

const VerifyOtp = () => {

    const inputRefs = Array.from({ length: 6 }, () => useRef(null));
    const [inputValues, setInputValues] = useState(['', '', '', '', '', '']);
    const concatenatedValue = parseInt(inputValues.join(''), 10);
    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const handleInputChange = (index, e) => {
        const value = e.target.value;
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);

        if (value === '' && index > 0) {
            inputRefs[index - 1].current.focus();
        }

        if (value.length === 1 && index < inputRefs.length - 1) {
            inputRefs[index + 1].current.focus();
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await api.post('/user/verify/', { key: user, otp: `${concatenatedValue}` });
            if (response.status === 200) {
                dispatch(login(response.data));
                navigate('/otp-success')
            }
        } catch (error) {
            console.log(error);
            const errorMessages = getErrorMessage(error)
            if (error.response.data.non_field_errors.length > 0) {
                toast.error(error.response.data.non_field_errors[0])
            }
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
        <div className='m-5 flex flex-col gap-16'>
            <div>
                <img src="/back.png" alt="" className='w-7' onClick={() => { navigate('/Sign-Up') }} />
            </div>
            <div className='flex flex-col gap-4'>
                <div>
                    <p className='py-6 text-2xl font-poppins font-medium'>Verify OTP</p>
                </div>
                <div className='flex gap-3'>
                    {inputRefs.map((ref, index) => (
                        <input
                            type='number'
                            key={index}
                            ref={ref}
                            className='py-4 rounded-md outline-[#27ABE2] border border-gray-400 w-2/12 text-center'
                            maxLength={1}
                            onChange={(e) => handleInputChange(index, e)}
                        />
                    ))}
                </div>
                <div className='py-10'>
                    <button className='text-sm bg-[#27ABE2] outline-[#2385af]  text-white py-3 rounded-md w-full' onClick={verifyOtp} >Verify</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default VerifyOtp
