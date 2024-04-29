import { useEffect } from "react";
import { usePrescriptionContext } from "../hooks/usePrescription";
import PresDisplay from "../components/PresDisplay";
import CircularProgress from '@mui/material/CircularProgress'; // Material-UI component for loading spinner

const Quotations = () => {
    const { prescriptions, dispatch } = usePrescriptionContext();
    
    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await fetch("/api/allPres");
                if (!response.ok) throw new Error("Failed to fetch prescriptions");
                const json = await response.json();
                dispatch({ type: "SET_PRESCRIPTIONS", payload: json });
            } catch (error) {
                console.error(error);
            }
        };
        fetchPrescriptions();
    }, [dispatch]);
    
    return (
        <div className="ml-64">
            <h2 className="text-2xl font-semibold mb-4">Prescriptions</h2>
            {prescriptions ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {prescriptions.map((prescription) => (
                        <PresDisplay
                            key={prescription._id}
                            prescription={prescription}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <CircularProgress />
                </div>
            )}
        </div>
    );
}

export default Quotations;
