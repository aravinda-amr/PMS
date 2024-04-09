import {useContext} from 'react'
import {CommentContext} from '../context/CommentContext'

export const useCommentsContext = () => {
    const context = useContext(CommentContext)
    if (!context) {
        throw Error('useCommentsContext must be used within a CommentContextProvider')
    }
    return context
}