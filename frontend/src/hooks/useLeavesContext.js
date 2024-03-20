import {LeavesContext} from '../context/LeaveContext'
import {useContext} from 'react'

export const useLeavesContext = () => {
    const context = useContext(LeavesContext)
    if (!context) {
        throw Error('useWorkoutsContext must be used within a WorkoutsContextProvider')
    }
    return context
}