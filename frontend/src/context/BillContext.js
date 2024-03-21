import { createContext, useReducer } from "react";


export const BillContext = createContext();

export const billReducer = (state,action) => {
    switch(action.type){
        case 'SET_BILLS':
            return {
                bills: action.payload,
            };
        case 'CREATE_BILL':
            return {
                bills: [action.payload, ...state.bills],
            };
        case 'DELETEAMEDICINEFROMBILL':
            return {
                bills: state.bills.map(bill => {
                    if (bill.invoiceID === action.payload.invoiceID) {
                        return {
                            ...bill,
                            medicines: bill.medicines.filter((medicine, index) => index !== action.payload.medicineIndex)
                        };
                    }
                    return bill;
                })
            };
        case 'UPDATE_BILL':
            return {
                bills: state.bills.map((b) => 
                b.invoiceID === action.payload.invoiceID ? action.payload : b
                ),
            };
        default:
            return state;
    }
}




export const BillContextProvider= ({children}) => {
    const [state,dispatch] = useReducer(billReducer,{
        bills:[],
    });
    
    return(
        <BillContext.Provider value={{ ...state,dispatch}}>
            {children}
        </BillContext.Provider>
    )
    
}


