
import React, { useEffect, useState } from 'react';
import { useReordersContext } from '../hooks/useReorderContext';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';

//components
import ReorderDetails from '../components/ReorderDetails'
import ReorderForm from '../components/ReorderForm'
const Reorder = () =>{
   const {reorders, dispatch} = useReordersContext() //getting the workouts and dispatch from the context
   const [searchTerm, setSearchTerm] = useState("");
   const [filteredItems, setFilteredItems] = useState([]); // State to hold filtered items
   const [isLoading, setIsLoading] = useState(true);
   const [openDialog, setOpenDialog] = useState(false);
    useEffect(() => {
        const fetchReorder = async()=>{
            setIsLoading(true);
            const response = await fetch('/api/reorder') //fetching data from the backend and storing it in response
            const json = await response.json(); //converting the response to json
            if(response.ok){ //if the response is okay
                dispatch({type: 'SET_REORDER', payload: json}) //dispatching the action to the reducer
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

    const generateExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredItems);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Reorder Details");
        XLSX.writeFile(wb, "reorder_details.xlsx");
     };


    return(
        <div className="ml-64">
        <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4">
          <h1 className="text-2xl font-semibold text-gray-800">Reorder Drugs</h1>
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
        <div className="flex justify-between items-center mb-4">
          {/* Assuming the "Add a New Reorder Level" button is part of the ReorderForm component */}
          <ReorderForm />
          <Button
            variant="outlined"
            size="small"
            onClick={() => setOpenDialog(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white ml-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" 
          >
            Download Report
          </Button>
        </div>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Download Report</DialogTitle>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={generateExcel}>Download</Button>
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






