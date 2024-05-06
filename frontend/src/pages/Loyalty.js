import { useEffect, useState } from "react";
import UserDetails from "../components/UserDetails";
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import jsPDF from 'jspdf';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { format } from 'date-fns';

const Loyalty = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [months, setMonths] = useState(6); // State for the number of months
  const [isFiltered, setIsFiltered] = useState(true); // Initially set to true to display filtered users
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [customTotalAmount, setCustomTotalAmount] = useState(""); // Default to 100


  useEffect(() => {
    const fetchAndFilterUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/user");
        if (!response.ok) throw new Error('Failed to fetch users');
        const users = await response.json();
        const usersWithTotal = await Promise.all(
          users.map(async (user) => {
            const totalResponse = await fetch(`/api/user/totalAmount/${user.contact}?months=${months}`);
            const totalData = await totalResponse.json();
            return { ...user, totalAmount: totalData.length > 0 ? totalData[0].totalAmount : 0 };
          })
        );
        // Filter users to only include those with totalAmount > 100000
        const filteredUsers = usersWithTotal.filter(user => user.totalAmount > 100000);
        setUsers(usersWithTotal); // Store all users
        setFilteredUsers(filteredUsers); // Initially, show users with totalAmount > 100000
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndFilterUsers();
  }, [months]);

  const handleFetchClick = () => {
    // Toggle the isFiltered state
    setIsFiltered(!isFiltered);

    // Apply the customTotalAmount filter to all users
    const filtered = users.filter(user => user.totalAmount > customTotalAmount);
    setFilteredUsers(filtered);
  };

  // Search functionality (unchanged)
  useEffect(() => {
    let filtered;
    if (isFiltered) {
      // If filtered, only include users with totalAmount > customTotalAmount
      filtered = users.filter(user => user.totalAmount > (customTotalAmount || 100000) && (
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.contact.includes(searchTerm)
      ));
    } else {
      // If not filtered, include all users
      // If customTotalAmount is set, filter users with totalAmount > customTotalAmount
      // Otherwise, include all users
      filtered = users.filter(user => (
        !customTotalAmount || (customTotalAmount && user.totalAmount > customTotalAmount)
      ) && (
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.contact.includes(searchTerm)
        ));
    }
    setFilteredUsers(filtered);
  }, [searchTerm, users, isFiltered, customTotalAmount]); // Add customTotalAmount to the dependency array



  const downloadCSV = () => {
    setOpenDialog(true); // Open the dialog instead of downloading immediately
  };

  const generatePDF = (users, heading, months) => {
    const doc = new jsPDF();
    // Calculate the center position for the heading
    const textWidth = doc.getStringUnitWidth(heading) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const pageWidth = doc.internal.pageSize.getWidth();
    const xOffset = (pageWidth - textWidth) / 2;

    // Append the time period to the heading
    const headingWithTimePeriod = `${heading} (Last ${months} months)`;

    // Add the heading to the PDF, centered
    doc.text(headingWithTimePeriod, xOffset, 10, { align: 'center' });

    // Add a line break for spacing
    doc.text('', 0, 20);

    // Add the table with user details
    doc.autoTable({
      head: [['Name', 'Contact', 'Total Amount']],
      body: users.map(user => [user.name, user.contact, user.totalAmount]),
    });

    return doc;
  };




  return (

    <div className="px-4 py-8 ml-auto">
      <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4">
        <h1 className="text-2xl font-semibold text-gray-800 ml-64">Loyalty Program</h1>
        <div className="flex items-center">
          <h4 className="text-lg font-medium text-gray-600 mr-2">
            {isFiltered ? `Customer purchases over 100,000 within the last ${months} months` : `Customer purchases within last ${months} months`}
          </h4>
        </div>
        <div className="flex items-center">
          <div className="flex items-center space-x-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TextField
              label="Search users..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-gray-700"
            />
          </div>
        </div>
      </div>
      <div className="p-4 ml-64 flex space-x-4 justify-between">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <Button
              variant="outlined"
              size="small"
              onClick={handleFetchClick}
              className="ml-4 h-10 flex-shrink-0 w-36"
            >
              {isFiltered ? "All Users" : "Total > 100,000"}
            </Button>
            <TextField
              type="number"
              label="Custom amount"
              variant="outlined"
              size="small"
              value={customTotalAmount}
              onChange={(e) => setCustomTotalAmount(e.target.value ? Number(e.target.value) : "")}
              className="ml-4 h-10 px-3 py-2 border border-dark-blue-2 rounded-md text-gray-700 w-38"
            />
          </div>
          <div className="flex items-center space-x-4">
          <FormControl variant="outlined" className="h-10 px-3 py-2">
              <InputLabel id="months-label" className="appearance-none">Months</InputLabel>
              <Select
                labelId="months-label"
                id="months"
                className=" h-10 px-3 py-2 w-24"
                value={months}
                onChange={(e) => setMonths(e.target.value ? Number(e.target.value) : 6)}
                label="Months"
              >
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={24}>24</MenuItem>
              </Select>
  </FormControl>
            <Button
              variant="outlined"
              size="small"
              onClick={downloadCSV}
              className="h-10 flex-shrink-0"
            >
              Download
            </Button>
          </div>
        </div>


        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Download</DialogTitle>
          <DialogContent>
            <label htmlFor="fileFormat">Select File Format:</label>
            <select id="fileFormat" className="ml-2">
              <option value="pdf">PDF</option>
              <option value="csv">CSV</option>
            </select>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4">Name</th>
                  <th className="px-4">Contact</th>
                  <th className="px-4">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.contact}</td>
                    <td className="px-4 py-2">{user.totalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              const fileFormat = document.getElementById('fileFormat').value;
              let fileName;
              if (isFiltered) {
                fileName = customTotalAmount ? `customers_over_${customTotalAmount}.${fileFormat}` : `customers_over_100.${fileFormat}`;
              } else {
                fileName = customTotalAmount ? `customers_over_${customTotalAmount}.${fileFormat}` : `all_customers.${fileFormat}`;
              }

              if (fileFormat === 'csv') {
                // Define the heading
                const heading = `Name,Contact,Total Amount\n`;
                // Prepend the heading to the CSV content
                const csvContent = heading + filteredUsers.map(user => `${user.name},${user.contact},${user.totalAmount}`).join('\n');
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                link.click();
                link.remove();
              } else if (fileFormat === 'pdf') {
                let heading = '';
                if (isFiltered) {
                  heading = customTotalAmount ? `Customers Over Rs.${customTotalAmount}` : `Customers over Rs.100,000`;
                } else {
                  heading = customTotalAmount ? `Customers Over Rs.${customTotalAmount}` : 'All Customers';
                }
                const doc = generatePDF(filteredUsers, heading, months);
                doc.save(fileName);
              }
              setOpenDialog(false);
            }}>Download</Button>
          </DialogActions>
        </Dialog>

      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen ml-64">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 ml-64">
          {filteredUsers &&
            filteredUsers.map((user) => (
              <UserDetails key={user._id} user={user} months={6} />
            ))}
        </div>
      )}




    </div>
  );

};

export default Loyalty;