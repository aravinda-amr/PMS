import React, { useEffect, useState } from "react";
import { useCommentsContext } from "../hooks/useCommentContext";
import CommentDetails from "../components/CommentDetails";
import CommentForm from "../components/CommentForm";
import TextField from "@mui/material/TextField";
import BarChart from "../components/Salechart";
import logo from "../images/logo-bw-2-nbg.png";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { MdDownload } from "react-icons/md";

const SalesReport = () => {
  const { comment, dispatch } = useCommentsContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [billingData, setBillingData] = useState([]);
  const [selectedRange, setSelectedRange] = useState(30); // Default to 30 days
  const [showGraph, setShowGraph] = useState(false);
  const [currentMonthProfit, setCurrentMonthProfit] = useState(0);
  const [previousMonthProfit, setPreviousMonthProfit] = useState(0);
  const currentMonth = new Date().toLocaleDateString("default", {
    month: "long",
  });
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() - 1);
  const previousMonth = currentDate.toLocaleDateString("default", {
    month: "long",
  });

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

  //Profitability Calculation
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

  //Generate Chart Data
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

  //Generate Chart Data Array
  const chartDataArray = Object.keys(chartData).map((drugName) => ({
    drugName,
    grandTotal: chartData[drugName],
  }));

  //Generate Data Month Wise
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

  //Generate Data Month Wise (Tables)
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

    //Most Sold Product
    const mostSoldProduct = bills.reduce((acc, bill) => {
      bill.medicines.forEach((medicine) => {
        if (!acc[medicine.drugName]) {
          acc[medicine.drugName] = 0;
        }
        acc[medicine.drugName] += medicine.purchaseQuantity;
      });
      return acc;
    }, {});

    //Sort Most Sold Product
    const mostSoldProductArray = Object.entries(mostSoldProduct).sort(
      (a, b) => b[1] - a[1]
    );
    const mostSoldProductName =
      mostSoldProductArray.length > 0 ? mostSoldProductArray[0][0] : "";

    return (
      <div key={key} className="mb-8">
        <div className="ml-8 mr-6">
          <div className="table-auto w-full border border-collapse border-blue-800"></div>
        </div>
        <h2 className="text-xl font-semibold font-jakarta mb-4 mt-8 ml-12">
          {new Date(bills[0].invoiceDate).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className="ml-4 mr-8">
          <table className="table-auto w-full mx-4 font-jakarta">
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
                    <td className="border px-4 py-2">Rs. {calculateSubTotal(medicine.purchaseQuantity,medicine.price )}.00</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="text-right mt-4 mr-8 font-jakarta">
          <strong>Total:</strong> Rs.{total}.00
        </div>
        <div className="text-right mt-2 mr-8 font-jakarta">
          <strong>Most Sold Product:</strong> {mostSoldProductName}
        </div>
      </div>
    );
  });

  //Generate PDF and Download
  const generateBillingPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);

    // Load the logo image
    const logoImg = new Image();
    logoImg.src = logo;

    // Add an event listener to wait for the image to load
    logoImg.onload = function () {
      // Calculate the width of the image to maintain aspect ratio
      const logoWidth = 80;
      const pageWidth = doc.internal.pageSize.getWidth();
      const aspectRatio = logoImg.width / logoImg.height;
      const logoHeight = logoWidth / aspectRatio;

      // Add the logo at the center of the PDF
      const x = (doc.internal.pageSize.width - logoWidth) / 2;
      doc.addImage(logoImg, "PNG", x, 10, logoWidth, logoHeight);
      doc.text("Sales Report", pageWidth / 2, 90, { align: 'center' });

      // Add months under the image
      let y = 10 + logoHeight + 10;

      // Group billing data by month
      const monthWiseData = billingData.reduce((acc, bill) => {
        const monthYear = new Date(bill.invoiceDate).toLocaleDateString(
          "default",
          { month: "long", year: "numeric" }
        );
        if (!acc[monthYear]) {
          acc[monthYear] = [];
        }
        acc[monthYear].push(bill);
        return acc;
      }, {});

      Object.entries(monthWiseData).forEach(([monthYear, bills]) => {
        doc.setFontSize(16);
        doc.text(monthYear, 105, y, { align: "center" });

        y += 8;
        const headers = [["Medicine Name", "Purchase Quantity", "Price"]];
        const rows = bills.flatMap((bill) =>
          bill.medicines.map((medicine) => [
            medicine.drugName,
            medicine.purchaseQuantity,
            medicine.price,
          ])
        );

        doc.autoTable({
          startY: y,
          head: headers,
          body: rows,
          theme: "striped",
          columnStyles: {
            0: { cellWidth: 80 },
            1: { cellWidth: 50 },
            2: { cellWidth: 40 },
          },
          styles: {
            fontSize: 12,
            overflow: "linebreak",
          },
        });

        y = doc.autoTable.previous.finalY + 10;
      });

      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(190, 10, `Page ${i} of ${pageCount}`, null, null, "right");
      }

      const date = new Date().toLocaleDateString();
      const time = new Date().toLocaleTimeString();
      doc.setFontSize(10);
      doc.text(
        `Generated on: ${date} at ${time}`,
        14,
        doc.internal.pageSize.height - 10
      );

      doc.save("Monthly Sales Reports.pdf");
    };
  };

  return (
    <div className="ml-64">
      <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4">
        <h1 className="text-2xl font-semibold text-gray-800  ml-8 font-jakarta">
          Sales Report
        </h1>
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

      <div className="bg-login1 w-56 py-1 rounded-lg ml-8">
        <div className="flex items-center ml-2">
          <button
            onClick={() => setShowGraph(!showGraph)}
            className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all ring-1 ring-inset ring-login2"
          >
            Graphs
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
      </div>

      <div className="flex justify-end mr-8">
        <button onClick={generateBillingPDF}>
          <MdDownload size={48} />
        </button>
      </div>

      <div className="ml-8 mr-8">
        {showGraph && <BarChart data={chartDataArray} />}
      </div>

      <div className="grid grid-cols-4">
        {filteredItems.map((comment) => (
          <CommentDetails key={comment._id} comments={comment} />
        ))}
      </div>

      <div className="mt-8 mb-12 mr-4 ml-8 rounded-lg bg-greenn text-white">
        <div className="bg-red-100 rounded-lg p-4 mt-4">
          <h1 className="text-xl font-semibold mb-2">Profitability</h1>
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-semibold">{currentMonth}</h3>
              <p>Profit: Rs.{currentMonthProfit}.00</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">
               {previousMonth}
              </h3>
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
