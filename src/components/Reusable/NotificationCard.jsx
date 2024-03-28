import React from 'react'

const NotificationCard = ({ imageUrl }) => {
    return (
        <div className="max-w-xs bg-white rounded-xl overflow-hidden border-2 shadow-md mx-auto">
            <img className="w-full" src={imageUrl} alt="Vehicle" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Hello LetMeGo User,</div>
                <p className="text-gray-700 text-base">Your vehicle is blocking the way of another LetMeGo user, please send assistance to them at the earliest.
                    Thank you.
                </p>
            </div>
        </div>
    )
}

export default NotificationCard
