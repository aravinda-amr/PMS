import { useContext } from "react";
import { PrescriptionContext } from "../context/PrescriptionContext";

export const usePrescriptionContext = () => {
    const context = useContext(PrescriptionContext);
    
    if (!context) {
        throw new Error("usePrescriptionContext must be used within a PrescriptionContextProvider");
    }
    
    return context;
}
