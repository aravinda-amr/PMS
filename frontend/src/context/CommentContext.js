import {createContext, useReducer} from 'react'

export const CommentContext = createContext()

export const commentsReducer = (state, action) => {
    switch(action.type){
        case 'SET_COMMENTS':
            return {
                comment: action.payload
            }
        case 'CREATE_COMMENTS':
            return{
                comment: [action.payload, ...state.comment]
            }
        case 'DELETE_COMMENTS':
            return{
                comment: state.comment.filter((c) => c._id !== action.payload._id)
            }

        default:
            return state    
    }
}

export const CommentsContextProvider =({children}) => {
    const [state, dispatch] = useReducer(commentsReducer, {
        comment: null
    })

    return(
        <CommentContext.Provider value={{...state, dispatch}}>
            {children}
        </CommentContext.Provider>

    )
}