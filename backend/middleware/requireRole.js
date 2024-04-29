import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const requireRole = (role) => {
    return async (req, res, next) => {
        // Verify authentication
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ error: 'Authorization token required' });
        }

        const token = authorization.split(' ')[1];

        try {
            const { _id } = jwt.verify(token, process.env.SECRET);

            // Retrieve user from the database
            const user = await User.findOne({ _id }).select(role);

            if (!user) {
                return res.status(401).json({ error: 'User not found' });
            }

            // Check if user's role matches the required role
            if (user.role !== role) {
                return res.status(403).json({ error: 'Insufficient permissions' });
            }

            // Set the user property to the request object
            req.user = user;
            next(); // Fire the next handler function
        } catch (error) {
            console.error(error);
            res.status(401).json({ error: 'Request is not authorized' });
        }
    };
};

export default requireRole;
