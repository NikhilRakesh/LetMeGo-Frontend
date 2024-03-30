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
    const [showInstallPopup, setShowInstallPopup] = useState(false);
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

    useEffect(() => {
        fetchhData()
    }, [])

    const user = useSelector(state => state.auth.user);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleInstallPrompt = (event) => {
        // Prevent the default behavior
        event.preventDefault();

        // Set the popup state to true to show the custom install popup
        setShowInstallPopup(true);

        // Save the event for later use
        window.deferredPrompt = event;
    };

    const handleClosePopup = () => {
        setShowInstallPopup(false);
        window.deferredPrompt = null;
    };

    const handleInstallClick = async () => {
        const promptEvent = window.deferredPrompt;

        if (promptEvent) {
            // Show the install prompt
            promptEvent.prompt();

            // Wait for the user's choice
            const { outcome } = await promptEvent.userChoice;

            if (outcome === 'accepted') {
                console.log('User accepted the install prompt.');
            } else {
                console.log('User dismissed the install prompt.');
            }

            // Reset the deferredPrompt property
            window.deferredPrompt = null;
        }
    };
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
    useEffect(() => {
        window.addEventListener('beforeinstallprompt', handleInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
        };
    }, []);


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
                    <div className='flex justify-between' onClick={() => { setShowLogoutConfirmation(true) }}>
                        <div className='flex gap-5'>
                            <img src="/setting.png" alt="" className='w-5 h-5' />
                            <p>Logout</p>
                        </div>
                        <div>
                            <img src="/next (1).png" alt="" className='w-5' />
                            <ToastContainer />
                        </div>
                    </div>
                    {showInstallPopup &&
                        <div className=" bottom-16 right-5 flex flex-col mt-5 items-center">
                            <button
                                className="bg-blue-500 w-full hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
                                onClick={handleInstallClick}
                            >
                                Install our Web App
                            </button>
                        </div>}
                </div>
            </div>
            <div className='bg-white flex justify-center p-5 gap-20 mb-5 '>
                <img src="/home (1).png" alt="" className='w-5 cursor-pointer' onClick={() => { navigate('/home') }} />
                <img src="/user (1).png" alt="" className='w-5 cursor-pointer' onClick={() => { navigate('/user-profile') }} />
            </div>
            {showLogoutConfirmation && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <p className="text-lg font-semibold mb-4">Confirm Logout</p>
                        <p className="text-gray-600 mb-4">Are you sure you want to logout?</p>
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mr-4"
                                onClick={() => setShowLogoutConfirmation(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                                onClick={Logout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    )
}

export default Profile
