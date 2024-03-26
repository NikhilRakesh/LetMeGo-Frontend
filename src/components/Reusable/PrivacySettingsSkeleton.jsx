const PrivacySettingsSkeleton = () => {
    return (
      <div className="m-5">
      <div className="flex">
         <div className="w-7 h-7 bg-gray-300 rounded-full animate-pulse"></div>
      </div>
      <div className="py-5">
         <div className="w-36 h-8 bg-gray-300 rounded animate-pulse"></div>
      </div>
      <div className="font-semibold font-syne pt-5">
         <div className="w-20 h-5 bg-gray-300 rounded animate-pulse"></div>
      </div>
      <div className="py-10 flex flex-col gap-5">
         <div className="flex justify-between items-end">
           <p className="text-xs font-medium bg-gray-300 rounded animate-pulse w-20 h-5"></p>
           <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse"></div>
         </div>
         <div className="flex justify-between items-end">
           <p className="text-xs font-medium bg-gray-300 rounded animate-pulse w-20 h-5"></p>
           <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse"></div>
         </div>
      </div>
      <div className="flex justify-center py-10">
         <div className="w-36 h-10 bg-gray-300 rounded animate-pulse"></div>
      </div>
     </div>
     
    );
  };
  
  export default PrivacySettingsSkeleton;
  