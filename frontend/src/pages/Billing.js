import React, { useEffect, useState } from 'react';
import { useBillContext } from '../hooks/useBillContext';
import BillDetails from '../components/BillDetails';

const Billing = () => {
    const { bills, dispatch } = useBillContext();
    const [isAdmin, setIsAdmin] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchBilling = async () => {
            try {
                const response = await fetch('/api/billing');
                const json = await response.json();

                if (response.ok) {
                    dispatch({ type: 'SET_BILLS', payload: json });
                }
            } catch (error) {
                console.error('Error fetching billing:', error);
            }
        };
        fetchBilling();
    }, [dispatch]);

    useEffect(() => {
        setIsAdmin(true);
    }, []);

    const handleDeleteMedicine = async (invoiceID, medicineIndex) => {
        try {
            const response = await fetch(`/api/billing/${invoiceID}/medicine/${medicineIndex}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                // Update the local state with the updated bills data
                const updatedBills = bills.map(bill => {
                    if (bill.invoiceID === invoiceID) {
                        // Filter out the deleted medicine from the current bill
                        bill.medicines = bill.medicines.filter((medicine, index) => index !== medicineIndex);
                    }
                    return bill;
                });
                dispatch({ type: 'SET_BILLS', payload: updatedBills });
            } else {
                console.error('Error deleting medicine:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting medicine:', error);
        }
    };

   
    
    

    const filteredBills = bills.filter(bill =>
        (bill.invoiceID && bill.invoiceID.includes(searchQuery)) ||
        (bill.customerID && bill.customerID.includes(searchQuery)) ||
        (bill.pharmacistID && bill.pharmacistID.includes(searchQuery))
    );

    return (
        <div className="billing-container flex">
            <div className="navbar w-64 bg-dark-blue h-full text-white px-4 py-1 px-3 font-jakarta">
                {/* Navigation bar content */}
            </div>
            <div className="bill-list flex flex-col flex-1 px-4 sm:px-6 lg:px-8 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold mb-4">All Bills</h1>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full min-w-[500px]">
                        <thead>
                            <tr className="bg-dark-blue text-white">
                                <th className="px-4 py-2 text-left text-sm font-medium uppercase">Invoice ID</th>
                                <th className="px-4 py-2 text-left text-sm font-medium uppercase whitespace-nowrap">Pharmacist ID</th>
                                <th className="px-4 py-2 text-left text-sm font-medium uppercase whitespace-nowrap">Customer ID</th>
                                <th className="px-4 py-2 text-left text-sm font-medium uppercase">Invoice Date</th>
                                <th className="px-4 py-2 text-left text-sm font-medium uppercase">Medicines</th>
                                <th className="px-4 py-2 text-left text-sm font-medium uppercase">Subtotal</th>
                                <th className="px-4 py-2 text-left text-sm font-medium uppercase">Discount Amount</th>
                                <th className="px-4 py-2 text-left text-sm font-medium uppercase whitespace-nowrap">Grand Total</th>
                                <th className="px-4 py-2 text-left text-sm font-medium uppercase whitespace-nowrap">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBills.map((bill, medicineIndex) => (
                                <BillDetails key={bill.invoiceID} bill={bill} isAdmin={isAdmin} onDeleteMedicine={() => handleDeleteMedicine(bill.invoiceID, medicineIndex)} 
                                dispatch={dispatch} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Billing;
