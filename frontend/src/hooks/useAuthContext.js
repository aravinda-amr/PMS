import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuthContext must be used inside an AuthContextProvider");
    }

    return context;
}

//if you want to use that context in a component in future, you can use the useContext hook 
//to access the context and the state and dispatch values