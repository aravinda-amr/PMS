import { usePrescriptionContext } from "../hooks/usePrescription";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PrescriptionDetails = ({ prescription }) => {
    const { dispatch } = usePrescriptionContext();

    const handleClick = async () => {
        const response = await fetch("/api/prescription/" + prescription._id, {
            method: "DELETE",
        });
        const json = await response.json();

        dispatch({ type: "DELETE_PRESCRIPTION", payload: json });
    }

    const handleUpdate = async () => {
        const response = await fetch("/api/prescription/" + prescription._id, {
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
            {/* <img src={prescription.prescriptionImg} alt="prescription" /> */}

            {/* <h3>Created At</h3>
            <p>{prescription.createdAt}</p>
            <p>{formatDistanceToNow(new Date(prescription.createdAt), {addSuffix : true})}</p> */}

            <button onClick={handleClick}>Delete</button>
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default PrescriptionDetails;