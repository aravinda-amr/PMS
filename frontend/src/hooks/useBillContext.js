import {BillContext} from '../context/BillContext';
import {useContext} from 'react';

export const useBillContext = () => {
    const context = useContext(BillContext);

    if (!context) {
        throw Error('useBillContext must be used within a BillContextProvider');
    }


    return context;
}