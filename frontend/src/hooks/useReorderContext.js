import { ReorderContext } from "../context/ReorderContext";
import { useContext } from "react";

export const useReordersContext = () => { //custom hook by callling useWorkoutsContext we can get the current context value
    const context = useContext(ReorderContext) //useContext is a hook that is used to consume the context
    //this hook returns the current context value for the context and the dispatch method for updating the context value
    if(!context){
        throw Error('useWorkoutsContext must be used within a workoutContextProvider')
    }
    return context
}