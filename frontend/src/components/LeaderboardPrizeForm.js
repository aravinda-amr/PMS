import React, { useState } from 'react';

const LeaderboardPrizeForm = ({ id, onPrizeAdded }) => {
  const [cashPrize, setCashPrize] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const response = await fetch(`/api/leaderboard/${id}/addCashPrize`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ cashPrize }),
          });
  
          if (!response.ok) {
              throw new Error('Failed to add cash prize');
          }
  
          setCashPrize('');
  
          const data = await response.json();
          const newCashPrize = data.cashPrize;
  
          if (onPrizeAdded) {
              onPrizeAdded(newCashPrize);
          }
      } catch (error) {
          console.error('Error adding cash prize:', error);
      }
  };

   
  return (
    <form
 className="coupon-form bg-dark-blue-2 text-white p-4 rounded-lg shadow-md"
 onSubmit={handleSubmit}
>
 <div className="flex flex-col space-y-2">
    
    <label className="text-sm font-medium text-white">
      Cash Prize:
      <input
        type="number"
        value={cashPrize}
        onChange={(e) => setCashPrize(e.target.value)}
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-dark-blue p-2"
      />
    </label>
 </div>
 <button
    className="bg-login1 hover:bg-login2 text-white font-semibold py-2 px-4 rounded mt-4"
    type="submit"
 >
    Add Cash Prize
 </button>
</form>
  );
};

export default LeaderboardPrizeForm;