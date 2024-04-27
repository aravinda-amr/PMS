import { useEffect, useState } from 'react';
import { useCommentsContext } from '../hooks/useCommentContext';
import CommentDetails from '../components/CommentDetails';
import CommentForm from '../components/CommentForm';
import TextField from '@mui/material/TextField';
import BarChart from '../components/Salechart';

const SalesReport = () => {
  const { comment, dispatch } = useCommentsContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]); // State to hold filtered items
  const [billingData, setBillingData] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/salesreport');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_COMMENTS', payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  useEffect(() => {
    const fetchBillingData = async () => {
      const response = await fetch('/api/billing');
      const json = await response.json();

      if (response.ok) {
        setBillingData(json);
      }
    };

    fetchBillingData();
  }, []);

  useEffect(() => {
    // Filter items based on search term whenever searchTerm changes
    const filteredComments = comment?.filter(
      (comments) => comments.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? []; // Ensure filtered is always an array
    setFilteredItems(filteredComments);
  }, [searchTerm, comment]);

  const data = [
    { drugname: 'Drug A', price: 10 },
    { drugname: 'Drug B', price: 20 },
    { drugname: 'Drug C', price: 15 },
    { drugname: 'Drug D', price: 25 }
  ];

  return (
    <div className="ml-64">
        <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4">
      <h1 className="text-2xl font-semibold text-gray-800 ">Sales Report</h1>

      <TextField
        type="text"
        label="Search by title"
        size="small"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>

      <div className="flex justify-start items-center mb-4">
      <CommentForm />
      </div>
      {filteredItems.map((comment) => (
        <CommentDetails key={comment._id} comments={comment} />
      ))}
      <BarChart data={data} />
      {/* Display Billing Data */}
      <h2 className="text-xl font-semibold text-gray-800 mt-8">Billing Data</h2>
      <table>
        <thead>
          <tr>
            {/* <th>Pharmacist ID</th>
            <th>Customer ID</th>
            <th>Invoice Date</th> */}
            <th>Medicines</th>
            {/* <th>Sub Total</th>
            <th>Discount</th>
            <th>Coupon Code</th> */}
            <th>Grand Total</th>
          </tr>
        </thead>
        <tbody>
          {billingData.map((bill) => (
            <tr key={bill._id}>
              {/* <td>{bill.pharmacistID}</td>
              <td>{bill.customerID}</td>
              <td>{bill.invoiceDate}</td> */}
              <td>
                <ul>
                  {bill.medicines.map((medicine, index) => (
                    <li key={index}>
                      {medicine.drugName} - Quantity: {medicine.purchaseQuantity} - Price: {medicine.price}
                    </li>
                  ))}
                </ul>
              </td>
              {/* <td>{bill.calculateSubTotal}</td>
              <td>{bill.discount}</td>
              <td>{bill.couponCode}</td> */}
              <td>{bill.grandTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;