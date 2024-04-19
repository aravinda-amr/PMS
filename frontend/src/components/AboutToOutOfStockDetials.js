
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const AboutToOutOfStockDetials = ({ abtoutof }) => {
  const [drugName, setDrugName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDrugName = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/abtoutofstock/medicine/${abtoutof.drugName}`);
        if (response.ok) {
          const data = await response.json();
          setDrugName(data.drugName);
        } else {
          console.error('Failed to fetch drug name');
        }
      } catch (error) {
        console.error('Error fetching drug name:', error);
      }
      setIsLoading(false);
    };

    fetchDrugName();
  }, [abtoutof.drugName]);

  return (
    <div className="overflow-x-auto" style={{ marginTop: '20px' }}>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress />
        </div>
      ) : (
        <table className="coupon-table w-full bg-dark-blue-2 text-white border-collapse">
          <thead className="coupon-table-thead bg-dark-blue text-white">
            <tr className="coupon-table-tr">
              <th className="coupon-table-th border border-gray-300 px-4 py-2">Drug Name</th>
              <th className="coupon-table-th border border-gray-300 px-4 py-2">Batch Number</th>
              <th className="coupon-table-th border border-gray-300 px-4 py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td className="coupon-table-td border border-gray-300 px-4 py-2">{abtoutof.drugName}</td>
              <td className="coupon-table-td border border-gray-300 px-4 py-2">{abtoutof.batchNumber}</td>
              <td className="coupon-table-td border border-gray-300 px-4 py-2">{abtoutof.quantity}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AboutToOutOfStockDetials;