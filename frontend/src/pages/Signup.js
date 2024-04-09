import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const { signup, isLoading, error } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password, name, contact);
    }

    // Set the background color to match the Login component
    document.body.style.backgroundColor = "#ffffff";

    return (
        <div className="flex justify-center py-32 font-jakarta">
            <form className="signup ml-64 flex flex-col bg-light-blue rounded-md w-128 right-0" onSubmit={handleSubmit}>
                <h3 className='text-center pt-8 font-semibold text-xl'>Sign Up</h3>
                <p className='text-center text-sm mb-5'>Create your account.</p>

                <label className='indent-6 mt-2 font-medium'>Name</label>
                <input className='mx-4 h-8 my-1 rounded-md indent-2 bg-text-blue'
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />

                <label className='indent-6 mt-4 font-medium'>Contact</label>
                <input className='mx-4 h-8 my-1 rounded-md indent-2 bg-text-blue'
                    type="text"
                    onChange={(e) => setContact(e.target.value)}
                    value={contact}
                />

                <label className='indent-6 mt-4 font-medium'>Email</label>
                <input className='mx-4 h-8 my-1 rounded-md indent-2 bg-text-blue'
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <label className='indent-6 mt-4 font-medium'>Password</label>
                <input className='mx-4 h-8 my-1 rounded-md indent-2 bg-text-blue'
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button disabled={isLoading} className='bg-login3 mx-auto px-16 py-2 rounded-md my-10 font-black cursor-pointer hover:bg-login2 hover:text-white hover:shadow-lg'>SIGN UP</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Signup;
