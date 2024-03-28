import React, { useState } from 'react'
import Dropdown from '../Reusable/Dropdown'
import { useNavigate } from 'react-router-dom'
import { getStates, keralaDistricts } from '../../utils/data'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getErrorMessage } from '../../utils/validate';
import { get_api_form_register } from '../../utils/api';
import { useSelector } from 'react-redux';

const CreateProfile = () => {

    const navigate = useNavigate()
    const user = useSelector(state => state.auth.user);

    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        number: '',
        dob: '',
        address: '',
        hide_name: '',
        hide_number: '',
    });
    const [dobError, setDobError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const state = getStates()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const updateGender = (gender) => {
        setFormData(prevState => ({
            ...prevState,
            gender: gender,
        }));
    }
    const handleDistrictChange = (value) => {
        setFormData({
            ...formData,
            district: value,
            address: `${value},${formData.state || ''},${formData.country || ''}`,
        });
    };
    const handleStateChange = (value) => {
        setFormData({
            ...formData,
            state: value,
            address: `${formData.district || ''},${value},${formData.country || ''}`,
        });
    };
    const handleCountryChange = (value) => {
        setFormData({
            ...formData,
            address: `${formData.district || ''},${formData.state || ''},${value}`,
        });
    };
    const onSubmit = async () => {
        if (!formData.name || !formData.gender || !formData.number || !formData.dob) {
            toast.error('Please fill in all required fields.');
            return false;
        }
        if (dobError || phoneError) {
            return
        }
        try {
            const response = await get_api_form_register(user.token).post('/user/detail/create/', formData);
            if (response.status === 201) {
                navigate('/privacy-settings')
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
    const validateDate = () => {
        const currentDate = new Date();
        const selectedDate = new Date(formData.dob);

        if (selectedDate > currentDate) {
            setDobError('Date cannot be a future date');
        } else {
            setDobError('');
        }
    };
    const validatePhoneNumber = () => {
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(formData.number)) {
            setPhoneError('Invalid phone number');
        } else {
            setPhoneError('');
        }
    };

    return (
        <div className='m-5'>
            <div className='py-8'>
                <p className='text-center text-2xl font-syne font-semibold'>Create Profile</p>
            </div>
            <p className='font-semibold font-syne'>Personal Details</p>
            <div className='py-8 flex flex-col gap-5'>
                <div className='flex flex-col gap-1'>
                    <p className='text-xs text-gray-400'>Full Name*</p>
                    <input type="name" name='name' onChange={handleInputChange} className='p-2 border outline-[#27ABE2] border-gray-300 w-full rounded-md' />
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-xs text-gray-400'>Phone Number*</p>
                    <input type="Phone" name='number' onBlur={validatePhoneNumber} onChange={handleInputChange} className='p-2 outline-[#27ABE2] border border-gray-300 w-full rounded-md' />
                    {phoneError && <p className='text-xs text-red-500'>{phoneError}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-xs text-gray-400'>Date of Birth</p>
                    <input type="date" name='dob' onBlur={validateDate} onChange={handleInputChange} className='p-2 outline-[#27ABE2] border border-gray-300 w-full rounded-md' />
                    {dobError && <p className='text-xs text-red-500'>{dobError}</p>}
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-xs text-gray-400'>Gender</p>
                    <Dropdown bg='bg-white' data={['Male', 'Female', 'Other']} onUpdate={updateGender} />
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-xs text-gray-400'>Country</p>
                    <Dropdown bg='bg-white' onUpdate={handleCountryChange} data={['india']} />
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-xs text-gray-400'>State</p>
                    <Dropdown bg='bg-white' data={['Kerala']} onUpdate={handleStateChange} />
                </div>
                <div className='flex flex-col gap-1'>
                    <p className='text-xs text-gray-400'>District</p>
                    <Dropdown bg='bg-white' onUpdate={handleDistrictChange} data={keralaDistricts} />
                </div>
                <div className='flex justify-end '>
                    <button className='text-white bg-[#27ABE2] px-5 rounded-lg py-2' onClick={onSubmit}>Next</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default CreateProfile
