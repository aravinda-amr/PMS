// NewSale.js
import React from 'react';
import BillForm from '../components/BillForm';

const NewSale = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="w-64 bg-dark-blue text-white px-4 py-1 font-jakarta">
                {/* Navigation bar content */}
            </div>
            <div className="flex-1 bg-dark-blue ml-64">
                <div className="max-w-7xl mx-auto px-4 py-1">
                    <div className="w-full">
                        <BillForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewSale;


    