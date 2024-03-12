import User from '../models/userModel.js'; 

// login user
export const loginUser = async (req, res) => {
    res.json({ message: 'Login route' });
}

// signup user
export const signupUser = async (req, res) => {
    res.json({ message: 'Signup route' });
}