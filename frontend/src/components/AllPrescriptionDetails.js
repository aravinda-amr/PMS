
export const PrescriptionDetials = ({prs})=>{

    return (
        <div>
        <h3>Prescription Note</h3>
        <p>{prs.note}</p>

        <h3>Substitutes</h3>
        <p>{prs.substitutes}</p>

        <h3>Prescription Image</h3>
        <img src={prs.prescriptionImg} alt="prescription" /> 

        {/* <h3>Created At</h3>
        <p>{prescription.createdAt}</p>
        <p>{formatDistanceToNow(new Date(prescription.createdAt), {addSuffix : true})}</p> */}

    </div>
    );
 
   
}
   

  export default PrescriptionDetials