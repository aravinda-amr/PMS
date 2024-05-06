import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import logo from '../images/logo-bw-2-nbg.png';

import HomeIcon from '@mui/icons-material/Home';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import ReorderIcon from '@mui/icons-material/Reorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import SalesHistoryIcon from '@mui/icons-material/History';
import NewSaleIcon from '@mui/icons-material/AddShoppingCart';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import SummarizeIcon from '@mui/icons-material/Summarize';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InventoryIcon from '@mui/icons-material/Inventory';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const [showPosMenu, setShowPosMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
        if (!userFromLocalStorage || !userFromLocalStorage.role) {
            navigate('/');
        }
    }, [navigate]);

    const userRole = user ? user.role : null;


    console.log(userRole);

    const handleClick = () => {
        logout();
        navigate('/');
    }

    const togglePosMenu = () => {
        setShowPosMenu(!showPosMenu);
    }

    return (
        <header>


            <div className="fixed flex flex-col top-0 left-0 w-64 bg-dark-blue h-full text-white mr-2 px-4 py-1 font-jakarta overflow-y-scroll" style={{ overflowY: 'hidden' }}>


                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {/* Centering the logo */}
                    <img src={logo} alt="Logo" width="150px" height="150px" /> {/* Decreased size */}
                </div>

                <div className="text-sm border-t-2 pt-6 border-blue-button">
                    

                    {(userRole === 'inventory handler' || userRole === 'admin') && (
                        <>
                            <Link to="/">
                                <div className='flex my-3 hover:bg-blue-button hover:shadow-xl hover:transition-all px-3 py-1 rounded-md'>
                                    <HomeIcon />
                                    <h1 className='ps-1 my-auto'>Home</h1>
                                </div>
                            </Link>

                            <Link to="/inventory">
                                <div className='flex my-3 hover:bg-blue-button hover:shadow-xl hover:transition-all px-3 py-1 rounded-md'>
                                    <InventoryIcon />
                                    <h1 className='ps-1 my-auto'>Inventory</h1>
                                </div>
                            </Link>

                            <Link to="/reorder">
                                <div className='flex my-3 hover:bg-blue-button hover:shadow-xl hover:transition-all px-3 py-1 rounded-md'>
                                    <ReorderIcon />
                                    <h1 className='ps-1 my-auto'>Reorder</h1>
                                </div>
                            </Link>

                            <Link to="/expired">
                                <div className='flex my-3 hover:bg-blue-button hover:shadow-xl hover:transition-all px-3 py-1 rounded-md'>
                                    <AccessTimeIcon />
                                    <h1 className='ps-1 my-auto'>Expired Drugs</h1>
                                </div>
                            </Link>

                            <Link to="/abtexpired">
                                <div className='flex my-3 hover:bg-blue-button hover:shadow-xl hover:transition-all px-3 py-1 rounded-md'>
                                    <RemoveCircleIcon />
                                    <h1 className='ps-1 my-auto'>About To Expire Drugs</h1>
                                </div>
                            </Link>

                            <Link to="/outofstock">
                                <div className='flex my-3 hover:bg-blue-button hover:shadow-xl hover:transition-all px-3 py-1 rounded-md'>
                                    <RemoveShoppingCartIcon />
                                    <h1 className='ps-1 my-auto'>OutOfStock</h1>
                                </div>
                            </Link>

                            <Link to="/abtoutofstock">
                                <div className='flex my-3 hover:bg-blue-button hover:shadow-xl hover:transition-all px-3 py-1 rounded-md'>
                                    <ProductionQuantityLimitsIcon />
                                    <h1 className='ps-1 my-auto'>AboutToOutOfStock</h1>
                                </div>
                            </Link>
                        </>
                    )}

                    {(userRole === 'manager' || userRole === 'admin') && (
                        <>
                            <Link to="/dash">
                                <div className='flex my-3 hover:bg-blue-button hover:shadow-xl hover:transition-all px-3 py-1 rounded-md'>
                                    <SummarizeIcon />
                                    <h1 className='ps-1 my-auto'>Dashboard</h1>
                                </div>
                            </Link>
                            <Link to="/loyalty">
                                <div className='flex my-3 hover:bg-blue-button hover:shadow-xl hover:transition-all px-3 py-1 rounded-md'>
                                    <LoyaltyIcon />
                                    <h1 className='ps-1 my-auto'>Loyalty</h1>
                                </div>
                            </Link>

                            <Link to="/staffReward">
                                <div className='flex my-3 hover:bg-blue-button hover:shadow-xl hover:transition-all px-3 py-1 rounded-md'>
                                    <HandshakeIcon />
                                    <h1 className='ps-1 my-auto'>Handled order Details</h1>
                                </div>
                            </Link>

                            <Link to="/leaderboard">
                                <div className='flex my-3 hover:bg-blue-button hover:shadow-xl hover:transition-all px-3 py-1 rounded-md'>
                                    <LeaderboardIcon />
                                    <h1 className='ps-1 my-auto'>Staff Leaderboard</h1>
                                </div>
                            </Link>

                            <Link to="/salesreport">
                                <div className='flex my-3 hover:bg-blue-button hover:shadow-xl hover:transition-all px-3 py-1 rounded-md'>
                                    <SummarizeIcon />
                                    <h1 className='ps-1 my-auto'>SalesReport</h1>
                                </div>
                            </Link>
                        </>
                    )}

                    {userRole === 'admin' && (
                        <>
                            <Link to="/staffreg">
                                <div className='flex my-3 hover:bg-blue-button hover:shadow-xl hover:transition-all px-3 py-1 rounded-md'>
                                    <HowToRegIcon/>
                                    <h1 className='ps-1 my-auto'>Staff Registration</h1>
                                </div>
                            </Link>
                        </>
                    )}

                    {(userRole === 'customer' || userRole === 'admin') && (
                        <>
                            <Link to="/prescription">
                                <div className='flex my-3 hover:bg-blue-button hover:shadow-xl hover:transition-all px-3 py-1 rounded-md'>
                                    <MedicationOutlinedIcon />
                                    <h1 className='ps-1 my-auto'>Prescriptions</h1>
                                </div>
                            </Link>
                        </>
                    )}

                    {(userRole === 'prescription handler' || userRole === 'admin') && (
                        <>
                            <Link to="/quotations">
                                <div className='flex my-3 hover:bg-blue-button hover:shadow-xl hover:transition-all px-3 py-1 rounded-md'>
                                    <MedicationOutlinedIcon />
                                    <h1 className='ps-1 my-auto'>Quotations</h1>
                                </div>
                            </Link>
                        </>
                    )}
                    
                    {(userRole === 'pharmacist' || userRole === 'admin') && (
                           <Link to="/leaves">
                                <div className='flex my-3 hover:bg-blue-button hover:shadow-xl hover:transition-all px-3 py-1 rounded-md'>
                                    <CalendarTodayIcon />
                                    <h1 className='ps-1 my-auto'>Leaves</h1>
                                </div>
                            </Link> 
                    )}
                    

                    {(userRole === 'cashier' || userRole === 'admin') && (
                        
                        <div className='flex my-3 hover:bg-blue-button hover:shadow-xl hover:transition-all px-3 py-1 rounded-md'>
                        <PointOfSaleIcon onClick={togglePosMenu} />
                        <div className='ml-2 flex flex-col' style={{ marginTop: '2px' }}>
                            <h1 className='my-auto'>POS</h1>
                            {showPosMenu && (
                                <React.Fragment>
                                    <Link to="/new-sale" className='my-auto'>
                                        <NewSaleIcon style={{ marginRight: '10px' }} />
                                        New Sale
                                    </Link>
                                    <Link to="/billing" className='my-auto'>
                                        <SalesHistoryIcon style={{ marginRight: '10px' }} />
                                        Sales History
                                    </Link>
                                </React.Fragment>
                            )}
                        </div>
                    </div>

                    )}

                    
                    {user && (

                    <div id="logout" className='fixed bottom-0'>
                        <h1 className='px-3 py-1 text-white'>{user.email}</h1>
                        <div onClick={handleClick} className='flex my-3 hover:bg-blue-button hover:shadow-xl hover:transition-all px-3 py-1 rounded-md'>
                            <LogoutIcon />
                            <h1 className='ps-1 my-auto'>Logout</h1>
                        </div>
                    </div>
                )}
                </div>

            </div>

            <nav className="flex justify-end bg-dark-blue-2 h-15 items-end text-sm">
                

                {!user && (
                    <div className='flex my-auto'>
                        <div className='bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all'><Link to="/login">Login</Link></div>
                        <div className='bg-signup1 hover:bg-signup2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all'><Link to="/signup">Signup</Link></div>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Navbar;








