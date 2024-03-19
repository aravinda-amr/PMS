import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export const useUsers = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUsers must be used within a UserProvider");
    }

    return context;
}