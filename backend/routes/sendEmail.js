import express from 'express';
const router = express.Router();
import sendEmail from '../utils/sendEmail.js';

router.post('/send-email', async (req, res) => {
    try {
        // Extract email options and recipient email from the request body
        const { to, subject, text} = req.body;

        // Check if required fields are present
        if (!to || !subject || (!text )) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Send email
        await sendEmail(subject, text, to); // Pass subject, text, and to fields directly to sendEmail function
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
