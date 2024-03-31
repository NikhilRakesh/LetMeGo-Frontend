import React, { useEffect, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';
import CustomInstallPopup from '../Authenthication/CustomInstallPopup';
import { useSelector } from 'react-redux';

const SkipBody = () => {

    const [showInstallPopup, setShowInstallPopup] = useState(false);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const pageVariants = {
        initial: {
            opacity: 0
        },
        in: {
            opacity: 1
        },
        out: {
            opacity: 0
        }
    };

    const pageTransition = {
        type: 'tween',
        ease: 'linear',
        duration: 0.5
    };

    const location = useLocation();
    const navigate = useNavigate()

    const NextOrSkip = () => {
        if (location.pathname === '/') {
            navigate('/skip-2')
        } else if (location.pathname === '/skip-2') {
            navigate('/skip-3')
        }
    }

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

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', handleInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
        };
    }, []);


    return (
        <div>
            <Outlet />
            <div className="flex justify-center gap-2">
                <Link to='/' className="h-3 w-3 flex items-center justify-center rounded-full border border-black">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                </Link>
                <Link to='skip-2' className="h-3 w-3 flex items-center justify-center rounded-full border border-black">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                </Link>
                <Link to='skip-3' className="h-3 w-3 flex items-center justify-center rounded-full border border-black">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                </Link>
            </div>
            <div className='py-10'>
                <p className=' text-center font-medium' onClick={() => { navigate('/login') }}>Skip</p>
            </div>
            <div className='flex justify-center'>
                {location.pathname === '/skip-3' ?
                    (<button className='text-white  bg-[#31C5F4] px-8 py-2 rounded-md' onClick={() => { navigate('/login') }} >Get Started</button>)
                    :
                    (<button className='text-white  bg-[#31C5F4] px-8 py-2 rounded-md' onClick={NextOrSkip}>Next</button>)
                }
            </div>
            {showInstallPopup && <CustomInstallPopup onClose={handleClosePopup} onInstall={handleInstallClick} />}
        </div>
    )
}

export default SkipBody
