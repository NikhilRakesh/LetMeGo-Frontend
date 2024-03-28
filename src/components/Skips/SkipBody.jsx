import React from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';

const SkipBody = () => {

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
        </div>
    )
}

export default SkipBody
