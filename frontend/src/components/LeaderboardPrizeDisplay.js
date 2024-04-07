import {IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const LeaderboardPrizeDisplay = ({ cashPrize,leaderboard }) => {

 return (
    <div className="bg-dark-blue-2 text-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-medium text-white">Cash Prize:</h2>

<p className="text-sm text-white">{cashPrize.cashPrize}


      <IconButton>
                  <DeleteIcon />
      </IconButton>
      <IconButton>
                  <EditIcon />
      </IconButton>
</p>
    </div>
 );
};

export default LeaderboardPrizeDisplay;
