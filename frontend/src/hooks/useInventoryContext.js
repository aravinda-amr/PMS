import {InventoryContext} from '../context/InventoryContext';
import {useContext} from 'react';

export const useInventoryContext = () => {
    const context = useContext(InventoryContext);

    if (!context) {
        throw Error('useInventoryContext must be used within a InventoryContextProvider');
    }

    return context;

}