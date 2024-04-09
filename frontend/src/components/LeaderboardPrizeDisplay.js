import { IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const LeaderboardPrizeDisplay = ({ cashPrize, leaderboard, onEditCashPrize }) => {

      const deleteCashPrize = async () => {
            try {
                  const response = await fetch(`/api/leaderboard/${leaderboard._id}/deleteCashPrize`, {
                        method: 'DELETE',
                  });
                  if (!response.ok) {
                        throw new Error('Failed to delete cash prize');
                  }
                  // Optionally, you can update the state or UI to reflect the deletion
            } catch (error) {
                  console.error('Error deleting cash prize:', error);
            }
      };



      return (
            <div className="bg-dark-blue-2 text-white p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-medium text-white">Cash Prize:</h2>
                  <p className="text-sm text-white">{cashPrize.cashPrize}
                        <IconButton onClick={deleteCashPrize}>
                              <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={() => onEditCashPrize(cashPrize)}>
                              <EditIcon />
                        </IconButton>
                  </p>
            </div>
      );
};

export default LeaderboardPrizeDisplay;
