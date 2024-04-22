
import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
        <div className="mx-4">
          <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead className="bg-dark-blue text-white">
        <TableRow>
          <TableCell sx={{ color: 'white', fontSize: '1.2rem' }}>Drug Name</TableCell>
          <TableCell sx={{ color: 'white', fontSize: '1.2rem' }}>Batch Number</TableCell>
          <TableCell sx={{ color: 'white', fontSize: '1.2rem' }}>Quantity</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell >{abtoutof.drugName}</TableCell>
          <TableCell >{abtoutof.batchNumber}</TableCell>
          <TableCell >{abtoutof.quantity}</TableCell>
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