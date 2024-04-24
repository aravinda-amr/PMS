import { usePrescriptionContext } from "../hooks/usePrescription";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PresDisplay = ({ prescription }) => {
    const { dispatch } = usePrescriptionContext();

    const handleQuotation = async () => {
        const response = await fetch("/api/allPres/" + prescription._id, {
            method: "PUT",
        });
        const json = await response.json();

        dispatch({ type: "UPDATE_PRESCRIPTION", payload: json });
    }

    return (
        <div>
            <h3>Prescription Note</h3>
            <p>{prescription.note}</p>

            <h3>Substitutes</h3>
            <p>{prescription.substitutes}</p>

            <h3>Prescription Image</h3>
            <img src={prescription.prescriptionImg} alt="prescription" width={100} height={60}/>

            <h3>Created At</h3>
            {/* <p>{prescription.createdAt}</p> */}
            <p>{formatDistanceToNow(new Date(prescription.createdAt), {addSuffix : true})}</p>

            <button onClick={handleQuotation}>Add Quotation</button>
        </div>
    );
};

export default PresDisplay;