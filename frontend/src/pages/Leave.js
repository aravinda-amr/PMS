import { useEffect, useState } from 'react';
import { useLeavesContext } from '../hooks/useLeavesContext';
import Button from '@mui/material/Button';
import LeaveDetails from '../components/LeaveDetails';
import LeavesForm from '../components/LeaveForm';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import EmailModal from './emailleave.js';
import TextField from '@mui/material/TextField';

const Leave = () => {
  const { leaves, dispatch } = useLeavesContext();
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  const handleEmailModalClose = () => {
    setEmailModalOpen(false);
  };

  //search
  useEffect(() => {
    const filtered = leaves?.filter(
      (item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )?? [];
    setFilteredLeaves(filtered);
  }, [searchTerm, leaves]);


  //getting data from the backend
  useEffect(() => {
    const fetchLeaves = async () => {
      const response = await fetch('/api/leaves');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    fetchLeaves();
  }, [dispatch]);


  // Email 
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

  return (
    <div className="px-4 py-8 ml-auto">
      <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4">
        <h1 className="text-2xl font-bold font-jakarta text-black flex-grow ml-64">Staff Leaves</h1>
        <div className="flex items-center">
         <TextField
              label="Search by name..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-gray-700"
            />
        </div>
      </div>
      <div className="flex ml-64 justify-start items-center mb-4">
        <LeavesForm className="" />
        <div className="ml-auto pr-4">
          <Button
            variant="outlined"
            size="small"
            onClick={() => setEmailModalOpen(true)}
            className="text-white px-4 py-1 rounded-lg font-semibold cursor-pointer hover:transition-all"
            sx={{
              backgroundColor: '#00BFFF',
              color: 'white',
              '&:hover': {
                backgroundColor: 'blue',
              },
              marginRight: '10px',
            }}
          >
            Send Email
            <MailOutlineIcon sx={{ marginLeft: '5px' }} />
          </Button>
          <EmailModal
            open={emailModalOpen}
            handleClose={handleEmailModalClose}
            handleSubmit={handleEmailModalSubmit}
          />
        </div>
      </div>
<div className="ml-64 grid grid-cols-3">
      {filteredLeaves.map((leave) => (
        <LeaveDetails key={leave._id} leave={leave} />
      ))}
</div>
    </div>
  );
};

export default Leave;
