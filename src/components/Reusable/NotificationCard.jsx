import React from 'react'

const NotificationCard = ({ imageUrl }) => {
    return (
        <div className="max-w-xs bg-white rounded-xl overflow-hidden border-2 shadow-md mx-auto">
            <img className="w-full" src={imageUrl} alt="Vehicle" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Alert!</div>
                <p className="text-gray-700 text-base">Your vechile is blocking others...</p>
            </div>
        </div>
    )
}

export default NotificationCard
