import React from 'react';

const VehicleCardSkeleton = () => {
  return (
    <div className="bg-gray-50 shadow-md rounded-lg p-4 mb-4 border animate-pulse">
      <div className="h-6 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
    </div>
  );
};

export default VehicleCardSkeleton;
    