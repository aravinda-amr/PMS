import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const requireAuth = async(req, res, next) => {

    //verify authentication
    const { authorization } = req.headers

    if(!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }
    
    const token = authorization.split(' ')[1]

    try {
        const {_id, role} = jwt.verify(token, process.env.SECRET)

        //set the user property to the request object

        req.user = await User.findOne({ _id }).select('_id')
        req.role = role; // add role to the request object
        next()  //fire the next handler function

    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Request is not authorized' })
    }
}

export default requireAuth;


// in the route file we can use the requireAuth middleware to protect the route
//import express from 'express';
//import requireAuth from '../middleware/requireAuth.js';
//const router = express.Router();
//router.use(requireAuth);
//router.get('/', getWorkouts) like wise we can use the middleware to protect the routes