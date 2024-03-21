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
                <Link to="/reorder">
                    <h1>Reorder</h1>
                </Link>
                <Link to="/expired">
                    <h1>Expired Drugs</h1>
                </Link>
                <Link to="/abtexpired">
                    <h1>About To Expire Drugs</h1>
                </Link>
                <Link to="/outofstock">
                    <h1>Out Of Stock Drugs</h1>
                </Link>
                <Link to="/abtoutofstock">
                    <h1>About To Out Of Stock Drugs</h1>
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
                    </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar;