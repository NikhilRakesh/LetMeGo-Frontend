import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { get_api_form_register } from '../../utils/api';
import { getErrorMessage } from '../../utils/validate';
import { useSelector } from 'react-redux';
import NotificationCard from '../Reusable/NotificationCard';
import { useNavigate } from 'react-router-dom';

const Notification = () => {

    const [AlertData, setAlertData] = useState([])
    const navigate = useNavigate()

    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        FetchNotifications()
    }, [])

    const FetchNotifications = async () => {
        try {
            const response = await get_api_form_register(user.token).get(`/user/alert/list/`);
            if (response.status === 200) {
                setAlertData(response.data)
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
        <div className='m-5'>
            <div className='flex '>
                <img src="/back.png" alt="" className='w-7' onClick={() => { navigate('/home') }} />
            </div>
            <div className='py-5'>
                <p className=' font-semibold font-poppins'>Notifications</p>
            </div>
            <div>
                {AlertData.length === 0 ? (
                    <div>
                        <p className='text-sm font-poppins text-center'>No alert found</p>
                    </div>
                ) : (
                    AlertData.map((alert, index) => (
                        <div className='py-3'>
                            <NotificationCard
                                key={index}
                                imageUrl={alert.image}
                            />
                        </div>
                    ))
                )}

            </div>
            <ToastContainer />
        </div>
    )
}

export default Notification
