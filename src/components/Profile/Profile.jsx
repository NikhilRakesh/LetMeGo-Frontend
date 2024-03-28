import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getErrorMessage } from '../../utils/validate';
import { useDispatch, useSelector } from 'react-redux';
import { get_api_form_register } from '../../utils/api';
import { logout } from '../../Actions/authActions';

const Profile = () => {

    const [ProfileData, setProfileData] = useState({})

    useEffect(() => {
        fetchhData()
    }, [])

    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const fetchhData = async () => {
        try {
            const response = await get_api_form_register(user.token).get(`/user/detail/`);
            if (response.status === 200) {
                setProfileData(response.data)
            }
        } catch (error) {
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
    const Logout = async () => {
        try {
            const response = await get_api_form_register(user.token).post(`/user/logout/`);
            if (response.status === 200) {
                dispatch(logout())
            }
        } catch (error) {
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
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="m-5 flex flex-col h-screen justify-between  "
        >
            <div>
                <div className='flex '>
                    <img src="/back.png" alt="" className='w-7' onClick={() => { navigate('/home') }} />
                </div>
                <div className='py-5'>
                    <p className=' font-semibold font-poppins'>Profile</p>
                </div>
                <div className='py-5 flex justify-between items-center'>
                    <div>
                        <p className='font-semibold'>{ProfileData?.name}</p>
                        <p className='text-xs text-gray-400'>(+91) {ProfileData?.number}</p>
                    </div>
                    <div>
                        <img src="/Image-profile.png" alt="" />
                    </div>
                </div>
                <div>
                    <p className='font-semibold'>Personal Information</p>
                </div>
                <div className='py-5 flex flex-col gap-5'>
                    {/* <div className='flex justify-between'>
                        <div className='flex gap-5'>
                            <img src="/user (2).png" alt="" className='w-5 h-5' />
                            <p>Profile Details</p>
                        </div>
                        <div>
                            <img src="/next (1).png" alt="" className='w-5' />
                        </div>
                    </div> */}
                    <div className='flex justify-between' onClick={() => { navigate('/my-vehicle') }}>
                        <div className='flex gap-5'>
                            <img src="/automobile.png" alt="" className='w-5 h-5' />
                            <p>My Vechicles</p>
                        </div>
                        <div>
                            <img src="/next (1).png" alt="" className='w-5' />
                        </div>
                    </div>
                    <div className='flex justify-between' onClick={() => { navigate('/Profile-notification') }}>
                        <div className='flex gap-5'>
                            <img src="/bell (2).png" alt="" className='w-5 h-5' />
                            <p>Notfication</p>
                        </div>
                        <div>
                            <img src="/next (1).png" alt="" className='w-5' />
                        </div>
                    </div>
                    <div className='flex justify-between' onClick={() => { navigate('/Profile-Privacy-Settings') }}>
                        <div className='flex gap-5'>
                            <img src="/shield.png" alt="" className='w-5 h-5' />
                            <p>Security</p>
                        </div>
                        <div>
                            <img src="/next (1).png" alt="" className='w-5' />
                        </div>
                    </div>
                    <div className='flex justify-between' onClick={Logout}>
                        <div className='flex gap-5'>
                            <img src="/setting.png" alt="" className='w-5 h-5' />
                            <p>Logout</p>
                        </div>
                        <div>
                            <img src="/next (1).png" alt="" className='w-5' />
                            <ToastContainer />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white flex justify-center p-5 gap-20 mb-5 '>
                <img src="/home (1).png" alt="" className='w-5 cursor-pointer' onClick={() => { navigate('/home') }} />
                <img src="/user (1).png" alt="" className='w-5 cursor-pointer' onClick={() => { navigate('/user-profile') }} />
            </div>
        </motion.div>
    )
}

export default Profile
