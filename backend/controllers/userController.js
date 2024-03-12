import User from '../models/userModel.js'; 

// login user
export const loginUser = async (req, res) => {
    res.json({ message: 'Login route' });
}

// signup user
export const signupUser = async (req, res) => {
    const { email, password, name, contact } = req.body;

    try {
        const user = await User.signup(email, password, name, contact);

        res.status(200).json({ email, user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}