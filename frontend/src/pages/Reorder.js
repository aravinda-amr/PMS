
import React, { useEffect, useState } from 'react';
import { useReordersContext } from '../hooks/useReorderContext';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import SendIcon from '@mui/icons-material/Send';
import EmailModal from './email.js'; 



//components
import ReorderDetails from '../components/ReorderDetails'
import ReorderForm from '../components/ReorderForm'
const Reorder = () => {
  const { reorders, dispatch } = useReordersContext() //getting the workouts and dispatch from the context
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]); // State to hold filtered items
  const [isLoading, setIsLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const handleEmailModalClose = () => {
     setEmailModalOpen(false);
  }

  useEffect(() => {
    const fetchReorder = async () => {
      setIsLoading(true);
      const response = await fetch('/api/reorder') //fetching data from the backend and storing it in response
      const json = await response.json(); //converting the response to json
      if (response.ok) { //if the response is okay
        dispatch({ type: 'SET_REORDER', payload: json }) //dispatching the action to the reducer
      }
    }
    fetchReorder();
  }, [dispatch])

  useEffect(() => {
    // Filter items based on search term whenever searchTerm changes
    const filtered = reorders?.filter(
      (item) => item.drugName.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? []; // Ensure filtered is always an array
    setFilteredItems(filtered);

    // Set a delay before setting isLoading to false
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Delay of 1000 milliseconds (1 second)

    return () => clearTimeout(timer);

  }, [searchTerm, reorders]);

  const handleEmailModalSubmit = async (emailDetails) => {
    try {
      const response = await fetch('/api/email/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailDetails),
      });

      if (response.ok) {
        alert('Email sent successfully');
      } else {
        alert('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    }
 };


  const generatePDF = () => {
    // Initialize jsPDF instance
    const pdf = new jsPDF();

    // Define headers and body data
    const headers = [
      { header: 'SupplierEmail', dataKey: 'supplierEmail' },
      { header: 'DrugName', dataKey: 'drugName' },
      { header: 'Quantity', dataKey: 'quantity' },
      { header: 'Reorder Level', dataKey: 'reorderLevel' },
      { header: 'Status', dataKey: 'status' },
    ];

    // Convert your filteredItems to the format expected by autoTable
    const body = filteredItems.map(item => ({
      supplierEmail: item.supplierEmail,
      drugName: item.drugName,
      quantity: item.totalquantity, // Ensure this is correctly formatted
      reorderLevel: item.reorderLevel,
      status: item.status,
    }));

    // Call autoTable function on the pdf instance
    pdf.autoTable({
      head: [headers.map(h => h.header)],
      body: body.map(row => Object.values(row)),
      columnStyles: {
        0: { cellWidth: 'wrap' },
        1: { cellWidth: 'wrap' },
        2: { cellWidth: 'wrap' }, // Adjusted width for Quantity column
        3: { cellWidth: 'wrap' },
        4: { cellWidth: 'wrap' },
      },
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10,
        halign: 'center',
      },
      bodyStyles: {
        fontSize: 10,
        textColor: [0, 0, 0],
        cellPadding: { top: 1, right: 5, bottom: 1, left: 2 },
        rowPageBreak: 'avoid',
      },
      margin: { top: 10, left: 13 },
    });

    // Save the PDF
    pdf.save('reorder_report.pdf');

    setOpenDialog(false);
  };

  return (
    <div className="ml-64" id="reorder-content">
      <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4">
        <h1 className="text-2xl font-semibold text-gray-800 flex-grow text-center">Reorder Drugs</h1> {/* Added flex-grow and text-center */}

        <div className="flex items-center">
          <TextField
            label="Search Drugs..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-gray-700"
          />
        </div>
      </div>
      <div className="flex justify-start items-center mb-4">
        <ReorderForm className="mr-4" />
        <div className="ml-auto pr-4"> {/* Added margin to the right and left for positioning */}

<Button
        variant="outlined"
        size="small"
        onClick={() => setEmailModalOpen(true)}
        className="text-white px-4 py-1 rounded-lg font-semibold cursor-pointer hover:transition-all"
        sx={{
          backgroundColor: '#00BFFF', // Sets the background color to light blue
          color: 'white', // Sets the text color to white
          '&:hover': {
            backgroundColor: 'blue', // Adjust hover color as needed
          },
          marginRight: '10px', // Adds space from the right side of the button
        }}
      >
        Send Email
      </Button>
      <EmailModal
        open={emailModalOpen}
        handleClose={handleEmailModalClose}
        handleSubmit={handleEmailModalSubmit}
      />



          <Button
            variant="outlined"
            size="small"
            onClick={() => setOpenDialog(true)}
            className="bg-blue-500 hover: bg-signup1 text-white px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all"
          >
            Download Report
          </Button>
        </div>
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Download Report</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={generatePDF}>Download</Button>
        </DialogActions>
      </Dialog>

      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <CircularProgress />
        </div>
      ) : (
        <div>

          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ReorderDetails key={item._id} reorder={item} />
            ))
          ) : (
            <p className="text-center text-gray-500">No Drug Found</p>
          )}
        </div>
      )}
    </div>


  )

}
export default Reorder






