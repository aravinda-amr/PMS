
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AboutToOutOfStockDetials = ({ abtoutof }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay of 1 second
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1000 milliseconds = 1 second
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="overflow-x-auto" style={{ marginTop: '20px' }}>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress />
        </div>
      ) : (
        <div className="mx-4">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="bg-dark-blue text-white">
                <TableRow>
                  <TableCell sx={{ color: 'white', fontSize: '1.2rem' }}>Drug Name</TableCell>
                  <TableCell sx={{ color: 'white', fontSize: '1.2rem' }}>Total Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{abtoutof.drugName}</TableCell>
                  <TableCell>{abtoutof.totalquantity}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default AboutToOutOfStockDetials;