import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const EmailModal = ({ open, handleClose, handleSubmit }) => {
    const [emailDetails, setEmailDetails] = React.useState({ to: '', subject: '', text: '' });

    const handleChange = (e) => {
        setEmailDetails({ ...emailDetails, [e.target.name]: e.target.value });
    };

    const handleSubmitClick = () => {
        handleSubmit(emailDetails);
        handleClose();
    };

    return (
       
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    border: '2px solid black', // Set the border width and color
                    borderRadius: '10px', // Optional: Set the border radius
                },
            }}
        >
           
                <DialogTitle style={{ color: 'black' }}>Send Email</DialogTitle>
           
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="To"
                    type="email"
                    fullWidth
                    name="to"
                    value={emailDetails.to}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Subject"
                    type="text"
                    fullWidth
                    name="subject"
                    value={emailDetails.subject}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Message"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    name="text"
                    value={emailDetails.text}
                    onChange={handleChange}
                />
            </DialogContent>
           
            <DialogActions>
            <div className="btn bg-signup1 hover:bg-signup2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">
                <Button onClick={handleClose}>
                    Cancel
                </Button>
                </div>
                <div  className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">
                <Button onClick={handleSubmitClick} color="primary">
                    Send
                </Button>
                </div>
            </DialogActions>
           
        </Dialog>
      
    );
};

export default EmailModal;