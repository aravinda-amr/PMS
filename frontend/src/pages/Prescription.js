import { useEffect , useState} from "react";
import { usePrescriptionContext } from "../hooks/usePrescription";
import { useAuthContext } from "../hooks/useAuthContext";
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
// import { useAuthContext } from '../hooks/useAuthContext';

//importing the components
import PrescritpionUpload from "../components/PrescriptionUpload";
import PrescriptionDetails from "../components/PrescriptionDetails";

const Prescription = () => {
    const { prescriptions, dispatch } = usePrescriptionContext();
    const [filteredItems, setFilteredItems] = useState([]); // State to hold filtered items
    const [searchTerm, setSearchTerm] = useState("");
    const { user } = useAuthContext();
    
    useEffect(() => {
        const fetchPrescriptions = async () => {
        const response = await fetch("/api/allPres", {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'userId': `${user.userId}`
          }
        });
        const json = await response.json();
        console.log(json);
        if (response.ok) {
            dispatch({ type: "SET_PRESCRIPTIONS", payload: json });
        }
        };

        if(user){ 
        fetchPrescriptions();
        }
        //fetchPrescriptions();
    }, [dispatch, user]);

    useEffect(() => {
        // Filter items based on search term whenever searchTerm changes
        const filtered = prescriptions?.filter(
          (item) => item.note.toLowerCase().includes(searchTerm.toLowerCase())
        ) ?? []; // Ensure filtered is always an array
        setFilteredItems(filtered);
    
      }, [searchTerm, prescriptions]);
    
    return (
        <div className="ml-64">
            <div className="grid items-center bg-gray-100 rounded-lg p-4 mb-4">
            <h1 className="text-2xl font-semibold text-gray-800 flex-grow">Prescriptions</h1> {/* Added flex-grow and text-center */}

        <div className="flex items-center my-4">
          <TextField
            label="Search Prescriptions..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
            className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-gray-700"
            
          />
        </div>

        <div className="my-4">
            <PrescritpionUpload />
        </div>

        <div className="grid grid-cols-5">
            <h1 className="text-2xl font-semibold text-gray-800 flex-grow">Prescription Note</h1>
            <h1 className="text-2xl font-semibold text-gray-800 flex-grow">Substitutes</h1>
            <h1 className="text-2xl font-semibold text-gray-800 flex-grow">Created At</h1>
            <h1 className="text-2xl font-semibold text-gray-800 flex-grow">Image</h1>
            <h1 className="text-2xl font-semibold text-gray-800 flex-grow">Quotation</h1>
        </div>
        
      </div>
        <div className="prescription_list">
            {filteredItems &&
           filteredItems.map((prescription) => (
                <PrescriptionDetails
                key={prescription._id}
                prescription={prescription}
                />
            ))}
        </div>
        {/* <PrescritpionUpload /> */}
        </div>
    );
}

export default Prescription;
