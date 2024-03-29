import React from 'react';

const CustomInstallPopup = ({ onClose, onInstall }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
                <h2 className="text-2xl font-bold mb-4">Install LetMeGo?</h2>
                <p className="text-gray-600 mb-6">
                    We'd love for you to install LetMeGo so that you can use it more easily and
                    access it faster.
                </p>
                <div className="flex justify-between">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={onInstall}>Install</button>
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default CustomInstallPopup;
