import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const AboutExpireDetials = ({ expire }) => {

  const [drugName, setDrugName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDrugName = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/abtexpired/medicine/${expire.drugName}`);
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
  }, [expire.drugName]);


  return (
    <div className="overflow-x-auto" style={{ marginTop: '30px' }}>
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
                  <TableCell sx={{ color: 'white', fontSize: '1.2rem' }}>Manufacture Date</TableCell>
                  <TableCell sx={{ color: 'white', fontSize: '1.2rem' }}>Expire Date</TableCell>
                  <TableCell sx={{ color: 'white', fontSize: '1.2rem' }}>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>{expire.drugName}</TableCell>
                  <TableCell>{expire.batchNumber}</TableCell>
                  <TableCell>{new Date(expire.manufactureDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(expire.expireDate).toLocaleDateString()}</TableCell>
                  <TableCell>{expire.quantity}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default AboutExpireDetials
