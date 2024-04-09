import {createContext, useReducer} from 'react'

export const LeavesContext = createContext()

export const LeavesReducer = (state, action) => {
    switch(action.type){
        case 'SET_WORKOUTS':
            return {
                leaves: action.payload
            }
        case 'CREATE_WORKOUT':
            return{
                leaves: [action.payload, ...state.leaves]
            }
        case 'DELETE_WORKOUT':
            return{
                leaves: state.leaves.filter((w) => w._id !== action.payload._id)
            }
        case 'UPDATE_WORKOUT':  
            return{
              leaves: state.leaves.map((r) => r._id === action.payload._id ? action.payload : r)
            }
        default:
            return state    
    }
}

export const LeavesContextProvider =({children}) => {
    const [state, dispatch] = useReducer(LeavesReducer, {
        leaves: null
    })

    return(
        <LeavesContext.Provider value={{...state, dispatch}}>
            {children}
        </LeavesContext.Provider>

    )
}

