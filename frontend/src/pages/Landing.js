import { useAuthContext } from "../hooks/useAuthContext";
import { Link, Navigate } from 'react-router-dom';


const Landing = () => {
    const { user } = useAuthContext();

    

return (
    <div className="landing-page">
      <h1><center>welcome landing</center></h1>
    <div className='flex my-auto'>
        <div className='bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all'><Link to="/login">Login</Link></div>
        <div className='bg-signup1 hover:bg-signup2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all'><Link to="/signup">Signup</Link></div>   
    </div>
    </div>
  );
}

export default Landing;