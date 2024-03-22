import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    }

    document.body.style.backgroundColor = "#ffffff";

    return (

        <div className="flex justify-center py-32 font-jakarta">
        <form className="login ml-64 flex flex-col bg-light-blue rounded-md w-128 right-0" onSubmit={handleSubmit}>
            <h3 className='text-center pt-8 font-semibold text-xl'>Welcome Back!</h3>
            <p className='text-center text-sm mb-5'>Enter your credentials to login.</p>

            <label className='indent-6 mt-2 font-medium'>Email</label>
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
            <button disabled={isLoading} className='bg-login3 mx-auto px-16 py-2 rounded-md my-10 font-black cursor-pointer hover:bg-login2 hover:text-white hover:shadow-lg'>LOGIN</button>
            {error && <div className="error">{error}</div>}
        </form>
        </div>
    )
}

export default Login;