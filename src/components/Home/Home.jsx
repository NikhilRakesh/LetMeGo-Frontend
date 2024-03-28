import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { get_api_form_register } from '../../utils/api';
import { getErrorMessage, isValidRegNumber } from '../../utils/validate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchModal from './SearchModal';

const Home = () => {

  const [name, setname] = useState()
  const [OpenModal, setOpenModal] = useState(false)
  const [regNumber, setregNumber] = useState('')
  const [regNumberError, setregNumberError] = useState('')
  const [searchData, setsearchData] = useState([])

  useEffect(() => {
    fetchData()

  }, [])

  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user);
  const backgroundImageUrl = '/home-letmego.png';

  const fetchData = async () => {
    try {
      const response = await get_api_form_register(user.token).get('/user/get/first/');
      if (response.status === 200) {
        setname(response.data.name)
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
  const closeModal = () => {
    setOpenModal(false)
  }
  const fetchSearchData = async () => {
    try {
      const response = await get_api_form_register(user.token).get(`/user/vehicle/?search=${regNumber}`);
      if (response.status === 200) {
        if (response.data.is_empty === true) {
          setregNumber('')
          toast.error('No User Found')
          return
        }
        setsearchData(response.data.results)
        setregNumber('')
        setOpenModal(true)
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
      className="relative bg-cover bg-center min-h-screen flex overflow-x-hidden  "
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
    >
      <div className="absolute top-0 left-0 w-full m-5 ">
        <div className='flex justify-between w-10/12 '>
          <p className='text-xs text-white mt-4'>Good Afternoon, <span className='text-xs font-medium'>{name}</span></p>
          <div className='flex items-end'>
            <img src="/bell (2).png" alt="" className='w-5 h-5' onClick={() => { navigate('/Profile-notification') }} />
          </div>
        </div>
        <div className='w-6/12  py-2'>
          <p className='text-2xl text-white font-poppins'>Are you facing issue with any vehicle parked?</p>
          <p className='text-xs text-white py-1'>Don’t worry if they are a LetMeGo user, you can alert them now!</p>
        </div>
      </div>
      <div className='w-full flex items-end pt-20 overflow-hidden'>
        <div className=' w-full'>
          <p className='text-center font-poppins'>Find Vehicle Owner</p>
          <div className='bg-white my-5 mx-5 rounded-2xl' >
            <div className='flex flex-col gap-1 p-5 '>
              <p className='text-xs text-gray-400 '>Enter Vehicle Number</p>
              <input type="text" name='dob' value={regNumber} onChange={(e) => { setregNumber(e.target.value) }} className='p-2 outline-[#27ABE2] border border-gray-300 w-full rounded-md' placeholder='KL 00 AA 0000' />
              {regNumberError && <p className='text-xs text-red-500'>{regNumberError}</p>}
            </div>
            <div className='py-5 px-5'>
              <button className='text-sm bg-[#27ABE2]  text-white py-3 rounded-md w-full ' onClick={fetchSearchData} >Search </button>
            </div>
          </div>
          <div className='bg-white flex justify-center p-5 gap-20'>
            <img src="/home (2).png" alt="" className='w-5 cursor-pointer' />
            <img src="/user.png" alt="" className='w-5 cursor-pointer' onClick={() => { navigate('/user-profile') }} />
          </div>
          {OpenModal && <SearchModal closeModal={closeModal} data={searchData} />}
        </div>
      </div>
      <ToastContainer />
    </motion.div>
  )
}

export default Home
