import {useEffect, useState} from 'react'
import {useLeavesContext} from '../hooks/useLeavesContext'
import Button from '@mui/material/Button';
// components
import LeaveDetails from '../components/LeaveDetails'
import LeavesForm from '../components/LeaveForm'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import EmailModal from './email.js'; 

const Leave = () => {
  const {leaves, dispatch} = useLeavesContext()

  
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const handleEmailModalClose = () => {
     setEmailModalOpen(false);
  }

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
  
      <LeavesForm />
        {leaves && leaves.map((leave) =>(
          <LeaveDetails key={leave._id} leave={leave} />
        ))}
        </div>

  )
}

export default Leave