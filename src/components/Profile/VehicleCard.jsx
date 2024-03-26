import React from 'react';

const VehicleCard = ({ vehicle, DeleteVehicle }) => {

    return (
        <div className="bg-gray-50 shadow-md rounded-lg p-4 mb-4 border">
            <h2 className="text-lg font-semibold mb-2">{vehicle?.name}</h2>
            <p className="text-gray-600 mb-2">Vehicle Number: {vehicle?.register_number}</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => { DeleteVehicle(vehicle.id) }}>Delete</button>
        </div>
    );
};

export default VehicleCard;
