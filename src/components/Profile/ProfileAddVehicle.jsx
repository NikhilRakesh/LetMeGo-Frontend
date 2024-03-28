import React, { useState } from 'react'
import Dropdown from '../Reusable/Dropdown'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { get_api_form_register } from '../../utils/api';

const ProfileAddVehicle = () => {

    const [formData, setFormData] = useState({
        vehicle_type: '',
        fuel_type: 'ICE',
        name: '',
        register_number: ''
    });
    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate()

    const addType = (value) => {
        setFormData(prevState => ({
            ...prevState,
            vehicle_type: value,
        }));
    }
    const OnChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

    }
    const setFuelType = (fuelType) => {
        setFormData(prevState => ({
            ...prevState,
            fuel_type: fuelType
        }));
    };
    const addVehicle = async () => {
        const requiredFields = ['vehicle_type', 'fuel_type', 'name', 'register_number'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            toast.error('Please fill in all required fields.');
            return false;
        }
        try {
            const response = await get_api_form_register(user.token).post('/user/vehicle/create/', formData);
            if (response.status === 201) {
                navigate('/my-vehicle')
            }
        } catch (error) {
            console.log(error);
            if (error.response.data.register_number.length > 0) {
                toast.error(error.response.data.register_number[0])
            }
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
             <div className='flex   '>
                    <img src="/back.png" alt="" className='w-7' onClick={() => { navigate('/user-profile') }} />
                </div>
            <div className='py-5'>
                <p className='text-center text-2xl font-syne font-semibold'>Add Vehicle</p>
            </div>
            <div className='py-10'>
                <div className='flex flex-col gap-1 py-1'>
                    <p className='text-xs text-gray-400'>Vehicle Type</p>
                    <Dropdown bg='bg-white' data={['Two Wheeler', 'Three Wheeler', 'Four Wheeler', 'Others']} onUpdate={addType} />
                </div>
                <div className='flex flex-col gap-1 py-1'>
                    <p className='text-xs text-gray-400'>Model</p>
                    <input type="name" name='name' onChange={OnChange} className='p-2 border outline-[#27ABE2] border-gray-300 w-full rounded-md' />
                </div>
                <div className='flex flex-col gap-1 py-1'>
                    <p className='text-xs text-gray-400'>Registration Number</p>
                    <input type="name" name='register_number' onChange={OnChange} className='p-2 border outline-[#27ABE2] border-gray-300 w-full rounded-md' />
                </div>
                <div>
                    <p className='text-xs text-gray-400'>Fuel Type</p>
                    <div className='py-1 flex gap-8'>
                        <div
                            className={`flex justify-center w-6/12 border py-2 rounded-lg ${formData.fuel_type === 'ICE' ? 'bg-[#9FE8FF]' : ''
                                }`}
                            onClick={() => setFuelType('ICE')}
                        >
                            <div className='flex gap-2'>
                                <img src="/gas-station.png" className='w-5' alt="" />
                                <p className='text-xs font-medium'>ICE</p>
                            </div>
                        </div>
                        <div
                            className={`flex justify-center w-6/12 border py-2 rounded-lg ${formData.fuel_type === 'EV' ? 'bg-[#9FE8FF]' : ''
                                }`}
                            onClick={() => setFuelType('EV')}
                        >
                            <div className='flex gap-2'>
                                <img src="/electric-station.png" className='w-5' alt="" />
                                <p className='text-xs font-medium'>EV</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex justify-center py-10'>
                <button className='text-white bg-[#27ABE2] px-5 rounded-lg py-2 w-full' onClick={addVehicle}>Next</button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ProfileAddVehicle
