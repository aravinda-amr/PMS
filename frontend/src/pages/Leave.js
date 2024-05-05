import {useEffect, useState} from 'react'
import {useLeavesContext} from '../hooks/useLeavesContext'
import Button from '@mui/material/Button';
// components
import LeaveDetails from '../components/LeaveDetails'
import LeavesForm from '../components/LeaveForm'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import EmailModal from './emailleave.js'; 

const Leave = () => {
  const {leaves, dispatch} = useLeavesContext()

  
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  const handleEmailModalClose = () => {
     setEmailModalOpen(false);
  }

  //
  useEffect(() => {
    // Filter items based on search term whenever searchTerm changes
    const filtered = leaves?.filter(
      (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? []; // Ensure filtered is always an array
    setFilteredLeaves(filtered);

  }, [searchTerm, leaves]);
//
  
  useEffect(() => {

    const fetchLeaves = async () => {
      const response= await fetch('/api/leaves')
      const json = await response.json()

      if(response.ok){
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }

    }

    fetchLeaves()
  },[dispatch])

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

  return(
    <div className="ml-64">
       <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4">
              <h1 className="text-2xl font-semibold text-gray-800 flex-grow text-center">Staff Leaves</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 px-2 py-1 rounded-lg mb-4"
      />
      </div>
      <div className="flex justify-start items-center mb-4">
      <LeavesForm className="ml-4"/>
      <div className="ml-auto pr-4">

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
       <MailOutlineIcon sx={{ marginLeft: '5px' }} /> {/* Adds an icon to the button */}
      </Button>
      <EmailModal
        open={emailModalOpen}
        handleClose={handleEmailModalClose}
        handleSubmit={handleEmailModalSubmit}
      />
      </div>
      </div>
  
  
      {filteredLeaves.map((leave) => (
        <LeaveDetails key={leave._id} leave={leave} />
      ))}
        </div>

  )
}

export default Leave