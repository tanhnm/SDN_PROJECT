
import React from 'react';

const AdminHeader = () => {
    return (
        <header className="flex justify-between items-center h-16 bg-gray-800 text-white px-6">
            <div className="flex items-center space-x-4 ">
                <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a99a9f8361ca8fbc284488c05211431929308018cbb774be9071d5f7e678c8f?apiKey=b18136557b87444da5ca24a814c472b7" alt="PetHome Logo" className="h-12 w-12 rounded-full object-cover" />
                <h1 className="text-xl font-semibold">PetHome</h1>
            </div>
            <div className="flex items-center space-x-6">

            </div>
        </header>
    );
};

export default AdminHeader;
