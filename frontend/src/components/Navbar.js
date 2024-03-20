import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Home</h1>
                </Link>
                <Link to="/loyalty">
                    <h1>Loyalty</h1>
                </Link>
                <Link to="/leaves">
                    <h1>Leaves</h1>
                </Link>
                <nav>
                    {user &&(
                    <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Logout</button>
                    </div>
                    )}
                    
                    {!user && (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                        <Link to="/reorder">Reorder</Link>
                    </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;