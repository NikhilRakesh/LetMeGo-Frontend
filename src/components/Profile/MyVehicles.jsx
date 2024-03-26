import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import VehicleCard from './VehicleCard';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../../utils/validate';
import { get_api_form_register } from '../../utils/api';
import VehicleCardSkeleton from '../Reusable/VehicleCardSkeleton';

const MyVehicles = () => {

    const [Vechicles, setVechicles] = useState([])
    const [effect, seteffect] = useState(false)

    useEffect(() => {
        fetchSearchData()
    }, [effect])

    const user = useSelector(state => state.auth.user);
    const navigate = useNavigate()

    const fetchSearchData = async () => {
        try {
            const response = await get_api_form_register(user.token).get(`/user/vehicle/list/`);
            if (response.status === 200) {
                setVechicles(response.data)
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
    const DeleteVehicle = async (id) => {
        try {
            const response = await get_api_form_register(user.token).delete(`/user/vehicle/${id}/delete/`);
            if (response.status === 204) {
                seteffect(!effect)
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
            className="m-5  "
        >
            <div>
                <div className='flex  justify-between '>
                    <img src="/back.png" alt="" className='w-7' onClick={() => { navigate('/user-profile') }} />
                    <img src="/bell (2).png" alt="" className='w-5 h-5' />
                </div>
                <div className='py-5'>
                    <p className=' font-semibold font-poppins'>My Vehicles</p>
                </div>
                <div className="relative">
                    <div className='h-[550px] overflow-y-scroll'>
                        {
                            Vechicles.length === 0 ? (
                                <div>
                                    <VehicleCardSkeleton />
                                    <VehicleCardSkeleton />
                                    <VehicleCardSkeleton />
                                    <VehicleCardSkeleton />
                                    <VehicleCardSkeleton />
                                </div>
                            ) : (
                                Vechicles.map((vehicle, index) => <VehicleCard vehicle={vehicle} key={vehicle.id} DeleteVehicle={DeleteVehicle} />)
                            )
                        }

                    </div>
                    <div className='flex justify-end mt-auto right-0  absolute'>
                        <img src="/plus.png" alt="" className='w-10' onClick={() => { navigate('/add-vechicles') }} />
                    </div>
                </div>

            </div>
            <ToastContainer />
        </motion.div>
    )
}

export default MyVehicles
