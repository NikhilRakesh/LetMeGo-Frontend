import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Webcam from 'react-webcam';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { get_api_form_register } from '../../utils/api';
import { getErrorMessage } from '../../utils/validate';
import Loading from '../Reusable/Loading ';

const SearchModal = ({ closeModal, data }) => {
    const [image, setImage] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const [OpenLoading, setOpenLoading] = useState(false);
    const [facingMode, setFacingMode] = useState("user");
    const webcamRef = useRef(null);
    const user = useSelector(state => state.auth.user);
    const fileInputRef = useRef(null);

    const capture = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const contentType = 'image/jpeg';
        const file = base64ToFile(imageSrc, 'image.jpg', contentType);

        setImage(file);
        setShowCamera(false);
    };
    const base64ToFile = (base64Data, fileName, contentType) => {
        const byteNumbers = atob(base64Data.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(byteNumbers.length);
        const uintArray = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteNumbers.length; i++) {
            uintArray[i] = byteNumbers.charCodeAt(i);
        }

        const file = new File([uintArray], fileName, {
            type: contentType,
        });

        return file;
    };
    const toggleFacingMode = () => {
        const newFacingMode = facingMode === "user" ? "environment" : "user";
        setFacingMode(newFacingMode);
    };
    const SendPhoto = async () => {
        setOpenLoading(true)
        try {
            const response = await get_api_form_register(user.token).post(`/user/alert/create/`, { register_number: data[0].register_number, image: image });
            if (response.status === 200) {
                setImage('')
                setOpenLoading(false)
                toast.success('Alert sent successfuly')
            }
        } catch (error) {
            setOpenLoading(false)
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
    const PhoneCall = () => {
        if (data[0]?.number === 'null') {
            toast.error('Sorry, the user’s number is hidden. Don’t worry, you can send a picture notification now!')
        } else {
            window.location = `tel:${data[0]?.number}`;
        }
    }
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
    };


    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full flex items-center gap-3 justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg p-8 w-full max-w-md">
                    <div className="flex items-center justify-between mb-4">
                        <img src="/avatar.jpg" alt="User profile" className="w-12 h-12 rounded-full" />
                        <div>
                            <p className="font-semibold">{data[0]?.user_name}</p>
                            <p className="text-sm text-gray-500">{data[0]?.vehicle_type}</p>
                        </div>
                    </div>
                    <div className="flex gap-4  mb-4">
                        <button className="bg-[#9FE8FF] text-black px-4 py-2 rounded-md " onClick={PhoneCall}>Call</button>
                        <button className="bg-[#9FE8FF] text-black px-4 py-2 rounded-md " onClick={handleUploadClick}>Upload </button>
                        <button className="bg-[#9FE8FF] text-black px-4 py-2 rounded-md " onClick={() => setShowCamera(true)}>Send Image</button>
                    </div>
                    <div className="flex justify-center">
                        <button className=" bg-[#31C5F4] w-full py-2 rounded-lg text-white" onClick={closeModal}>Close</button>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    {showCamera && (
                        <>
                            <div className='py-3'>
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={{ facingMode }}
                                    className='rounded-lg'
                                />
                                <div className='py-2 flex justify-between'>
                                    <button className="bg-[#9FE8FF] text-black px-4 py-2 rounded-md" onClick={capture}>Capture</button>
                                    <button className="bg-[#9FE8FF] text-black px-4 py-2 rounded-md" onClick={toggleFacingMode}>Switch cam</button>
                                </div>
                            </div>
                        </>
                    )}
                    {image &&
                        (<div>
                            <img src={URL.createObjectURL(image)} alt="Captured" className='rounded-lg py-3' />
                            <div className='flex justify-center'>
                                <button className='bg-[#31C5F4] text-white px-4 py-2 rounded-md' onClick={SendPhoto}>Send</button>
                            </div>
                        </div>)
                    }
                </div>
            </div>
            {OpenLoading && <Loading />}
            <ToastContainer />
        </>
    );
};

export default SearchModal;
