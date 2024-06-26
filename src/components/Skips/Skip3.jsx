import React from 'react'
import { AnimatePresence, motion } from 'framer-motion';

const Skip3 = () => {

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

    return (
        <AnimatePresence mode='wait'>
            <motion.div
                key={window.location.pathname}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
            >
                <div className='py-10 px-5'>


                    <div className=' flex justify-center '>
                        <img src="/intro 3.png" className='md:w-6/12' alt="" />
                    </div>
                    <div className=' py-5'>
                        <p className='font-bold font-poppins text-2xl text-center'>Navigate Parking Challenges with Ease</p>
                    </div>
                    <div className='text-xs text-gray-400 font-poppins text-center'>
                        <p >#LetMeGo</p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default Skip3
