import React, { useState, useEffect } from 'react';

const LeaderboardPrizeForm = ({ id, onPrizeAdded, initialCashPrize, editMode }) => {
 const [cashPrize, setCashPrize] = useState(initialCashPrize || '');
 const [isValid, setIsValid] = useState(true); 
 const [message, setMessage] = useState('');

 useEffect(() => {
    setCashPrize(initialCashPrize || '');
    setIsValid(true); 
 }, [initialCashPrize]);

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      return; 
    }

    const endpoint = editMode ? `/api/leaderboard/${id}/updateCashPrize` : `/api/leaderboard/${id}/addCashPrize`;
    const method = editMode ? 'PATCH' : 'POST';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cashPrize }),
      });

      if (!response.ok) {
        throw new Error('Failed to add/update cash prize');
      }

      setCashPrize('');
      setIsValid(true); 
      setMessage(''); 

      const data = await response.json();
      const newCashPrize = data.cashPrize;

      if (onPrizeAdded) {
        onPrizeAdded(newCashPrize);
      }
    } catch (error) {
      console.error('Error adding/updating cash prize:', error);
    }
 };

 const handleInputChange = (e) => {
    const value = e.target.value;
    const isValidInput = /^\d+$/.test(value); 
    setIsValid(isValidInput);
    setCashPrize(value);
    if (!isValidInput) {
      setMessage('Please enter positive numbers only.'); 
    } else {
      setMessage(''); 
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
            onChange={handleInputChange}
            required
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-dark-blue p-2 ${!isValid ? 'border-red-500' : ''}`}
          />
          {!isValid && <p className="text-red-500 text-xs">{message}</p>}
        </label>
      </div>
      <button
        className="bg-login1 hover:bg-login2 text-white font-semibold py-2 px-4 rounded mt-4"
        type="submit"
      >
        {editMode ? "Update Cash Prize" : "Add Cash Prize"}
      </button>
    </form>
 );
};

export default LeaderboardPrizeForm;
