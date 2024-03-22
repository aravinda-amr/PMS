import {useEffect} from 'react';
import { useBillContext } from '../hooks/useBillContext';


import BillDetails from '../components/BillDetails';


const Billing = () => {

    const {bills ,dispatch} = useBillContext();

    useEffect(() => {
        const fetchBilling = async () => {
            const response = await fetch('/api/billing');
            const json = await response.json();


            if (response.ok) {
                dispatch({type: 'SET_BILLS', payload: json})
            }   
        }
        fetchBilling();
    }, []);


    return (
        <div className="billing-container flex">
            <div className="navbar w-64 bg-dark-blue h-full text-white px-4 py-1 px-3  font-jakarta">
                {/* Navigation bar content */}
            </div>
            <div className="bill-list px-4 sm:px-6 lg:px-8 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4">All Bills</h1>
                <table className="table-auto w-full min-w-[500px]">
                    <thead>
                        <tr className="bg-dark-blue text-white">
                    <th className="px-4 py-2 text-left text-sm font-medium  uppercase">Invoice ID</th>
                    <th className="px-4 py-2 text-left text-sm font-medium  uppercase whitespace-nowrap">Pharmacist ID</th>
                    <th className="px-4 py-2 text-left text-sm font-medium  uppercase whitespace-nowrap">Customer ID</th>
                    <th className="px-4 py-2 text-left text-sm font-medium  uppercase">Invoice Date</th>
                    <th className="px-4 py-2 text-left text-sm font-medium  uppercase">Medicines</th>
                    <th className="px-4 py-2 text-left text-sm font-medium  uppercase">Subtotal</th>
                    <th className="px-4 py-2 text-left text-sm font-medium  uppercase">Discount</th>
                    <th className="px-4 py-2 text-left text-sm font-medium  uppercase whitespace-nowrap">Grand Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map((bill) => (
                            <BillDetails key={bill.invoiceID} bill={bill} />
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default Billing;