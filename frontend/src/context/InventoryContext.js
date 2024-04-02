import { createContext,useReducer } from "react";

export const InventoryContext = createContext();

export const inventoryReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MEDICINENAMES':
            return {
                ...state,
                medicinenames: action.payload
            }
        case 'SET_DRUGS':
            return {
                ...state,
                drugs: action.payload
            }

        case 'CREATE_MEDICINENAME':
            return {
                ...state,
                medicinenames: [action.payload, ...state.medicinenames]
            }

        case 'CREATE_DRUG':
            return {
                ...state,
                drugs: [action.payload, ...state.drugs]
            }
        

        default:
            return state
    }
}



export const InventoryContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(inventoryReducer, {
        medicinenames: [],
        drugs: null 
        
    })

   

    return (
        <InventoryContext.Provider value={{...state,dispatch}}>
            {children}
        </InventoryContext.Provider>
    )

}