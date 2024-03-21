import { useAuthContext } from "./useAuthContext"
import { usePrescriptionContext } from "./usePrescription";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: prescriptionDispatch } = usePrescriptionContext();

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({ type: 'LOGOUT' })
        prescriptionDispatch({ type: "SET_PRESCRIPTIONS", payload: null });
    }

    return { logout }
}