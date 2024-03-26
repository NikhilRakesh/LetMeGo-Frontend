import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const Signinotpverify = () => {
    const inputRefs = Array.from({ length: 5 }, () => useRef(null));
    const [inputValues, setInputValues] = useState(['', '', '', '', '']);

    const navigate = useNavigate()

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

    const verifyOtp = () => {
        navigate('/home')
    }

    return (
        <div className='m-5 flex flex-col gap-16'>
            <div>
                <img src="/back.png" alt="" className='w-7' onClick={() => { navigate('/login') }} />
            </div>
            <div className='flex flex-col gap-4'>
                <div>
                    <p className='py-6 text-2xl font-poppins font-medium'>Verify OTP</p>
                </div>
                <div className='flex gap-3'>
                    {inputRefs.map((ref, index) => (
                        <input
                            key={index}
                            ref={ref}
                            className='py-4 rounded-md outline-[#27ABE2] border border-gray-400 w-2/12 text-center'
                            maxLength={1}
                            onChange={(e) => handleInputChange(index, e)}
                        />
                    ))}
                </div>
                <div className='py-10'>
                    <button className='text-sm bg-[#27ABE2]  text-white py-3 rounded-md w-full' onClick={verifyOtp} >Verify</button>
                </div>
            </div>
        </div>
    )
}

export default Signinotpverify
