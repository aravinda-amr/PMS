import { createContext, useReducer } from "react";

  export const ReorderContext = createContext()//creating a context object

  export const ReorderReducer = (state, action) => {//reducer function state is the current state and action is the action that we want to perform
    switch(action.type){
      case 'SET_REORDER':
        return{
          reorders : action.payload 
        }
      case 'CREATE_REORDER':
        return{
          reorders:[action.payload, ...state.reorders]
        }  
      case 'DELETE_REORDER':
        return{
          reorders: state.reorders.filter((r)=> r._id !== action.payload._id)
        }  
      case 'UPDATE_REORDER':  
      return{
        reorders: state.reorders.map((r) => r._id === action.payload._id ? action.payload : r)
      }
      default:
        return state  
    }
  }

  export const ReorderContextProvider = ({ children}) =>{ //children is a prop, which is the values that we wrap inbetween them. which is now app component
    const [state, dispatch] = useReducer(ReorderReducer, {
      reorders: null
    })//2 vaues should be passed to useReducer, 1st is the name for a reducer function and 2nd is the initial value for state
    return (
        <ReorderContext.Provider value={{...state, dispatch}}> 
            {children}
        </ReorderContext.Provider>
    )
  }
  //value is the prop that we pass to the provider, which is the value that we want to share with the rest of the app.