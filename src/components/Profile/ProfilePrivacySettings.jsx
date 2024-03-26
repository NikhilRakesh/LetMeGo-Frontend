import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { get_api_form_register } from '../../utils/api';
import { getErrorMessage } from '../../utils/validate';
import PrivacySettingsSkeleton from '../Reusable/PrivacySettingsSkeleton';

const ProfilePrivacySettings = () => {

    const user = useSelector(state => state.auth.user);

    const [ProfileData, setProfileData] = useState({})
    const [isToggled, setIsToggled] = useState(false);
    const [isToggled2, setIsToggled2] = useState(false);
    useEffect(() => {
        fetchhData()
    }, [isToggled, isToggled2])

    const navigate = useNavigate()

    const toggleButtonClasses = `w-14 h-8 flex items-center rounded-full ${isToggled ? 'bg-blue-500' : 'bg-gray-300'
        }`;
    const toggleButtonClasses2 = `w-14 h-8 flex items-center rounded-full ${isToggled2 ? 'bg-blue-500' : 'bg-gray-300'
        }`;

    const handleToggle = () => {
        RevertName()
        setIsToggled(prevState => !prevState);
    };
    const handleToggle2 = () => {
        RevertNumber()
        setIsToggled2(prevState => !prevState);
    };

    const fetchhData = async () => {
        try {
            const response = await get_api_form_register(user.token).get(`/user/detail/`);
            if (response.status === 200) {
                setProfileData(response.data)
                setIsToggled(response.data.hide_name)
                setIsToggled2(response.data.hide_number)
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
    const RevertName = async () => {
        try {
            const response = await get_api_form_register(user.token).put(`/user/revert/name/`);
            if (response.status === 200) {

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
    const RevertNumber = async () => {
        try {
            const response = await get_api_form_register(user.token).put(`/user/revert/number/`);
            if (response.status === 200) {

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
console.log(ProfileData);

    return (
        <div className='m-5'>
            <div className='flex   '>
                <img src="/back.png" alt="" className='w-7' onClick={() => { navigate('/user-profile') }} />
            </div>
            <div className='py-5'>
                <p className='text-center text-2xl font-syne font-semibold'>Create Profile</p>
            </div>
            <p className='font-semibold font-syne pt-5'>Privacy Settings</p>
            {
                !ProfileData ? <PrivacySettingsSkeleton /> :
                    (<div className='py-10 flex flex-col gap-5'>
                        <div className='flex justify-between items-end '>
                            <p className='text-xs font-medium'>Hide Name</p>
                            <button className={toggleButtonClasses} onClick={handleToggle}>
                                <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-all duration-300 ${isToggled ? 'translate-x-7' : ''
                                    }`} />
                            </button>
                        </div>
                        <div className='flex justify-between items-end '>
                            <p className='text-xs font-medium'>Hide Number</p>
                            <button className={toggleButtonClasses2} onClick={handleToggle2}>
                                <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-all duration-300 ${isToggled2 ? 'translate-x-7' : ''
                                    }`} />
                            </button>
                        </div>
                    </div>)}
            
            <ToastContainer />
        </div>
    )
}

export default ProfilePrivacySettings
