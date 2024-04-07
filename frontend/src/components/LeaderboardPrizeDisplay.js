import React, { useState, useEffect } from 'react';

const LeaderboardPrizeDisplay = ({ cashPrize,leaderboard }) => {

 return (
    <div className="bg-dark-blue-2 text-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-medium text-white">Cash Prize:</h2>
      
<p className="text-sm text-white">{cashPrize.cashPrize}</p>

    </div>
 );
};

export default LeaderboardPrizeDisplay;
