import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// generate tokens
const createTokens = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
}

// login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        //create a token
        const token = createTokens(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

// signup user
export const signupUser = async (req, res) => {
    const { email, password, name, contact } = req.body;

    try {
        const user = await User.signup(email, password, name, contact);

        //create a token
        const token = createTokens(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}