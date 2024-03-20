import { useEffect } from "react";
import { usePrescriptionContext } from "../hooks/usePrescription";

//importing the components
import PrescritpionUpload from "../components/PrescriptionUpload";
import PrescriptionDetails from "../components/PrescriptionDetails";

const Prescription = () => {
    const { prescriptions, dispatch } = usePrescriptionContext();
    
    useEffect(() => {
        const fetchPrescriptions = async () => {
        const response = await fetch("/api/prescription");
        const json = await response.json();
        if (response.ok) {
            dispatch({ type: "SET_PRESCRIPTIONS", payload: json });
        }
        };
        fetchPrescriptions();
    }, [dispatch]);
    
    return (
        <div className="prescription">
        <h2>Prescriptions</h2>
        <div className="prescription_list">
            {prescriptions &&
            prescriptions.map((prescription) => (
                <PrescriptionDetails
                key={prescription._id}
                prescription={prescription}
                />
            ))}
        </div>
        <PrescritpionUpload />
        </div>
    );
}

export default Prescription;
