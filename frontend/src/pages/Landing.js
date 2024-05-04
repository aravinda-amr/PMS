import { Link } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";

const Landing = () => {
    const { user } = useAuthContext();

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="landing-container flex flex-col bg-light-blue rounded-md w-128 right-0 p-6">
                <h1 className="text-center text-3xl font-bold mb-8">ANURA PHARMACY</h1>
                <div className="flex justify-center">
                    <div className="action-button bg-login3 mx-auto px-16 py-2 rounded-md my-10 font-black cursor-pointer hover:bg-login2 hover:text-white hover:shadow-lg transition-all">
                        <Link to="/login">Login</Link>
                    </div>
                    <div className="action-button bg-signup1 mx-auto px-16 py-2 rounded-md my-10 font-black cursor-pointer hover:bg-signup2 hover:text-white hover:shadow-lg transition-all">
                        <Link to="/signup">Signup</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
