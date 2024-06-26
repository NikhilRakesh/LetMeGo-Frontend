import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Webcam from 'react-webcam';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { get_api_form_register } from '../../utils/api';
import { getErrorMessage } from '../../utils/validate';
import Loading from '../Reusable/Loading ';
import { resizeFile } from 'react-image-file-resizer';

const SearchModal = ({ closeModal, data }) => {
    const [image, setImage] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const [OpenLoading, setOpenLoading] = useState(false);
    const [OpenWarning, setOpenWarning] = useState(false);
    const [facingMode, setFacingMode] = useState("user");
    const webcamRef = useRef(null);
    const user = useSelector(state => state.auth.user);
    const fileInputRef = useRef(null);


    const resizeImage = async (imageFile, maxWidth = 250, maxHeight = 250) => {
        const image = await createImage(imageFile);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const imageWidth = image.width;
        const imageHeight = image.height;

        if (imageWidth <= maxWidth && imageHeight <= maxHeight) {
            return imageFile;
        }

        let scaleFactor = 1;

        if (imageWidth > maxWidth) {
            scaleFactor = maxWidth / imageWidth;
        }

        if (imageHeight > maxHeight) {
            const scaleWidth = scaleFactor * imageWidth;
            const scaleHeight = imageHeight * (scaleWidth / imageWidth);

            if (scaleHeight > maxHeight) {
                scaleFactor = maxHeight / scaleHeight;
            }
        }

        const targetWidth = Math.floor(imageWidth * scaleFactor);
        const targetHeight = Math.floor(imageHeight * scaleFactor);

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        context.drawImage(image, 0, 0, targetWidth, targetHeight);

        return new Promise((resolve) => {
            canvas.toBlob(blob => {
                resolve(new File([blob], imageFile.name, { type: imageFile.type, lastModified: imageFile.lastModified }));
            }, 'image/jpeg');
        });
    };
    const createImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const img = new Image();

                img.src = event.target.result;
                img.onload = () => resolve(img);
            };

            reader.readAsDataURL(file);
        });
    };
    const capture = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const contentType = 'image/jpeg';
        const file = base64ToFile(imageSrc, 'image.jpg', contentType);

        const resizedFile = await resizeImage(file, 250, 250);

        setImage(resizedFile);
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
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const resizedFile = await resizeImage(file, 250, 250);
        setImage(resizedFile);
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
                        <button className="bg-[#9FE8FF] w-6/12 text-black px-4 py-2 rounded-md " onClick={PhoneCall}>Call</button>
                        <button className="bg-[#9FE8FF] w-6/12 text-black px-4 py-2 rounded-md " onClick={handleUploadClick}>Upload image</button>
                        {/* <button className="bg-[#9FE8FF] text-black px-4 py-2 rounded-md " onClick={() => setShowCamera(true)}>Send Image</button> */}
                    </div>
                    <div className="flex justify-center">
                        <button className=" bg-[#31C5F4] w-full py-2 rounded-lg text-white" onClick={() => { setOpenWarning(true) }}>Close</button>
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
                        (<div className='flex flex-col items-center'>
                            <img src={URL.createObjectURL(image)} alt="Captured" className='rounded-lg py-3 w-[200px] h-[200px] object-cover' />
                            <div className='flex justify-center'>
                                <button className='bg-[#31C5F4] text-white px-4 py-2 rounded-md' onClick={SendPhoto}>Send</button>
                            </div>
                        </div>)
                    }
                </div>
            </div>
            {OpenLoading && <Loading />}
            {OpenWarning &&
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-red-600">Warning!</h2>
                            <button >
                                <svg
                                    className="w-6 h-6 text-gray-700 hover:text-gray-900"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM5.293 6.707a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414L11.414 12l3.293 3.293a1 1 0 01-1.414 1.414L10 13.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 12 5.293 8.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                        <p>Are you sure you want to close?</p>
                        <div className="flex justify-end mt-6">
                            <button
                                className="px-4 py-2 mr-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                                onClick={closeModal}
                            >
                                Sure
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                onClick={() => { setOpenWarning(false) }}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>}
            <ToastContainer />
        </>
    );
};

export default SearchModal;
