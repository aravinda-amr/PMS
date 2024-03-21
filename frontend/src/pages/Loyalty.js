import { useEffect } from "react";
import { useUsers } from "../hooks/useUsers";

//components
import UserDetails from "../components/UserDetails";
import CouponForm from "../components/CouponForm";

const Loyalty = () => {
    const { user, dispatch } = useUsers();

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("/api/user");
            if (response.ok) {
                const json = await response.json();
                dispatch({ type: "SET_USERS", payload: json });
            }
        }

        fetchUsers();
    }, [dispatch]);
    
    return (
        <div className="home">
            <div className="workouts">
                {user && user.map((user) => (
                    <UserDetails key={user._id} user={user} />
                ))} 
            </div>
            
        </div>
    );
}

export default Loyalty;
