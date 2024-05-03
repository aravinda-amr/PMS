import React, { useEffect, useState } from "react";
import { useCommentsContext } from "../hooks/useCommentContext";
import CommentDetails from "../components/CommentDetails";
import CommentForm from "../components/CommentForm";
import TextField from "@mui/material/TextField";
import BarChart from "../components/Salechart";

const SalesReport = () => {
  const { comment, dispatch } = useCommentsContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [billingData, setBillingData] = useState([]);
  const [selectedRange, setSelectedRange] = useState(30); // Default to 30 days
  const [showGraph, setShowGraph] = useState(false);
  const [currentMonthProfit, setCurrentMonthProfit] = useState(0);
  const [previousMonthProfit, setPreviousMonthProfit] = useState(0);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/salesreport");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_COMMENTS", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  useEffect(() => {
    const fetchBillingData = async () => {
      const response = await fetch("/api/billing");
      const json = await response.json();

      if (response.ok) {
        setBillingData(json);
        calculateProfitability(json);
      }
    };

    fetchBillingData();
  }, []);

  useEffect(() => {
    const filteredComments =
      comment?.filter((comments) =>
        comments.title.toLowerCase().includes(searchTerm.toLowerCase())
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

  const calculateProfitability = (data) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    let currentMonthTotal = 0;
    let previousMonthTotal = 0;

    data.forEach((bill) => {
      const billMonth = new Date(bill.invoiceDate).getMonth();
      const billYear = new Date(bill.invoiceDate).getFullYear();

      if (billMonth === currentMonth && billYear === currentYear) {
        bill.medicines.forEach((medicine) => {
          currentMonthTotal += calculateSubTotal(
            medicine.purchaseQuantity,
            medicine.price
          );
        });
      } else if (billMonth === previousMonth && billYear === previousYear) {
        bill.medicines.forEach((medicine) => {
          previousMonthTotal += calculateSubTotal(
            medicine.purchaseQuantity,
            medicine.price
          );
        });
      }
    });

    setCurrentMonthProfit(currentMonthTotal);
    setPreviousMonthProfit(previousMonthTotal);
  };

  const chartData = {};
  filterTransactionsByDays(selectedRange).forEach((bill) => {
    bill.medicines.forEach((medicine) => {
      const { drugName, purchaseQuantity, price } = medicine;
      if (!chartData[drugName]) {
        chartData[drugName] = 0;
      }
      chartData[drugName] += calculateSubTotal(purchaseQuantity, price);
    });
  });

  const chartDataArray = Object.keys(chartData).map((drugName) => ({
    drugName,
    grandTotal: chartData[drugName],
  }));

  const monthWiseData = billingData.reduce((acc, bill) => {
    const month = new Date(bill.invoiceDate).getMonth();
    const year = new Date(bill.invoiceDate).getFullYear();
    const key = `${month}-${year}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(bill);
    return acc;
  }, {});

  const monthTables = Object.entries(monthWiseData).map(([key, bills]) => {
    const total = bills.reduce((acc, bill) => {
      return (
        acc +
        bill.medicines.reduce(
          (subTotal, medicine) =>
            subTotal +
            calculateSubTotal(medicine.purchaseQuantity, medicine.price),
          0
        )
      );
    }, 0);

    const mostSoldProduct = bills.reduce((acc, bill) => {
      bill.medicines.forEach((medicine) => {
        if (!acc[medicine.drugName]) {
          acc[medicine.drugName] = 0;
        }
        acc[medicine.drugName] += medicine.purchaseQuantity;
      });
      return acc;
    }, {});

    const mostSoldProductArray = Object.entries(mostSoldProduct).sort(
      (a, b) => b[1] - a[1]
    );
    const mostSoldProductName =
      mostSoldProductArray.length > 0 ? mostSoldProductArray[0][0] : "";

      
    return (
      <div key={key} className="mb-8">
        <div className="table-auto w-full border border-collapse border-blue-800"></div>
        <h2 className="text-xl font-semibold mb-4">
          {new Date(bills[0].invoiceDate).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <table className="table-auto w-full">
          <thead className="bg-dark-blue-2 p-4 rounded-lg shadow-md text-white">
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Medicine Name</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Unit Price (Rs.)</th>
              <th className="border px-4 py-2">Sub Total (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) =>
              bill.medicines.map((medicine, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    {new Date(bill.invoiceDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{medicine.drugName}</td>
                  <td className="border px-4 py-2">
                    {medicine.purchaseQuantity}
                  </td>
                  <td className="border px-4 py-2">Rs.{medicine.price}.00</td>
                  <td className="border px-4 py-2">
                    Rs.
                    {calculateSubTotal(
                      medicine.purchaseQuantity,
                      medicine.price
                    )}
                    .00
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="text-right mt-4">
          <strong>Total:</strong> Rs.{total}.00
        </div>
        <div className="text-right mt-2">
          <strong>Most Sold Product:</strong> {mostSoldProductName}
        </div>
      </div>
    );
  });

  return (
    <div className="ml-64">
      <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Sales Report</h1>
        <TextField
          type="text"
          label="Search by Manager"
          size="small"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex justify-start items-center mb-4">
        <CommentForm />
      </div>

      <div className="flex items-center">
        <button
          onClick={() => setShowGraph(!showGraph)}
          className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" style={{ color: "black" }}>Graphs
        </button>

        <select
          value={selectedRange}
          onChange={(e) => handleRangeChange(parseInt(e.target.value))}
          className="block w-1/8 py-0.5 px-0.5 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value={30}>Last 30 days</option>
          <option value={60}>Last 60 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {showGraph && <BarChart data={chartDataArray} />}

      {filteredItems.map((comment) => (
        <CommentDetails key={comment._id} comments={comment} />
      ))}

      <div
        style={{
          marginBottom: "20px",
          marginTop: "20px",
          marginLeft: "30px",
          backgroundColor: "#809e87",
          color: "white",
        }}
      >
        <div className="bg-gray-100 rounded-lg p-4 mt-4">
          <h1 className="text-xl font-semibold mb-2">Profitability</h1>
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">Current Month</h3>
              <p>Profit: Rs.{currentMonthProfit}.00</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Previous Month</h3>
              <p>Profit: Rs.{previousMonthProfit}.00</p>
            </div>
          </div>
        </div>
      </div>

      {monthTables}
    </div>
  );
};

export default SalesReport;
