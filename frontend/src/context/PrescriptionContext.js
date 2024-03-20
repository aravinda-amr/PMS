import { createContext, useReducer } from "react";

export const PrescriptionContext = createContext();

export const PrescriptionReducer = (state, action) => {
    switch (action.type) {
        case "SET_PRESCRIPTIONS":
        return {
            prescriptions: action.payload,
        };
        case "CREATE_PRESCRIPTION":
        return {
            prescriptions: [action.payload, ...state.prescriptions],
        };
        case "DELETE_PRESCRIPTION":
        return {
            prescriptions: state.prescriptions.filter(
            (p) => p._id !== action.payload._id
            ),
        };
        case "UPDATE_PRESCRIPTION":
        return {
            prescriptions: state.prescriptions.map((p) =>
            p._id === action.payload._id ? action.payload : p
            ),
        };
        default:
        return state;
    }
}

export const PrescriptionContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PrescriptionReducer, {
        prescriptions: null,
    });
    return (
        <PrescriptionContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PrescriptionContext.Provider>
    );
}
