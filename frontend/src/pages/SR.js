import { useEffect, useState } from 'react';
import { useCommentsContext } from '../hooks/useCommentContext';
import CommentDetails from '../components/CommentDetails';
import CommentForm from '../components/CommentForm';
import TextField from '@mui/material/TextField';
import BarChart from '../components/Salechart';

const SalesReport = () => {
  const { comment, dispatch } = useCommentsContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [billingData, setBillingData] = useState([]);
  const [selectedRange, setSelectedRange] = useState(30); // Default to 30 days

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


//Search
  useEffect(() => {
    const filteredComments = comment?.filter(
      (comments) => comments.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [];
    setFilteredItems(filteredComments);
  }, [searchTerm, comment]);
  

  const filterTransactionsByDays = (days) => {
    const today = new Date();
    const fromDate = new Date(today);
    fromDate.setDate(fromDate.getDate() - days);

    return billingData.filter((bill) => new Date(bill.invoiceDate) >= fromDate);
  };

  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  const calculateSubTotal = (quantity, unitPrice) => {
    return quantity * unitPrice;
  };

  const chartData = {};
  filterTransactionsByDays(selectedRange).forEach((bill) => {
    bill.medicines.forEach((medicine) => {
      const { drugName, purchaseQuantity, price } = medicine;
      if (!chartData[drugName]) {
        chartData[drugName] = 0;
      }
      chartData[drugName] += calculateSubTotal(purchaseQuantity,price);
    });
  });

  const chartDataArray = Object.keys(chartData).map((drugName) => ({
    drugName,
    grandTotal: chartData[drugName],
  }));

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
      <div>
        <label>
          <input
            type="radio"
            value={30}
            checked={selectedRange === 30}
            onChange={() => handleRangeChange(30)}
          />
          Last 30 days
        </label>
        <label>
          <input
            type="radio"
            value={60}
            checked={selectedRange === 60}
            onChange={() => handleRangeChange(60)}
          />
          Last 60 days
        </label>
        <label>
          <input
            type="radio"
            value={90}
            checked={selectedRange === 90}
            onChange={() => handleRangeChange(90)}
          />
          Last 90 days
        </label>
      </div>
      {filteredItems.map((comment) => (
        <CommentDetails key={comment._id} comments={comment} />
      ))}
      <BarChart data={chartDataArray} />
    </div>
  );
};

export default SalesReport;
