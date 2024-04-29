import { useEffect } from "react";
import { usePrescriptionContext } from "../hooks/usePrescription";
// import { useAuthContext } from '../hooks/useAuthContext';

//importing the components
import PresDisplay from "../components/PresDisplay";

const Quotations = () => {
    const { prescriptions, dispatch } = usePrescriptionContext();
    // const { user } = useAuthContext();
    
    useEffect(() => {
        const fetchPrescriptions = async () => {
        const response = await fetch("/api/allPres");
        const json = await response.json();
        console.log(json);
        if (response.ok) {
            dispatch({ type: "SET_PRESCRIPTIONS", payload: json });
        }
        };
        fetchPrescriptions();
    }, [dispatch]);
    
    return (
        <div className="ml-64">
        <h2>Adding Quotations</h2>
        <div className="prescription_list">
            {prescriptions &&
            prescriptions.map((prescription) => (
                <PresDisplay
                key={prescription._id}
                prescription={prescription}
                />
            ))}
        </div>
        </div>
    );
}

export default Quotations;
