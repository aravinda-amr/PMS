import React, { useState } from 'react';
import { MdEdit, MdClose } from 'react-icons/md';

const TotalPriceTable = ({ medicinenames, onUpdateTotalPrice , onSuccess }) => {
  const [newTotalPrices, setNewTotalPrices] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleTotalPriceChange = (medicineId, event) => {
    const { value } = event.target;
    setNewTotalPrices({
      ...newTotalPrices,
      [medicineId]: value,

    });
  };

  const handleUpdateTotalPrice = (medicineId) => {
    const totalPrice = newTotalPrices[medicineId];
    if (totalPrice && !isNaN(totalPrice)) {
      onUpdateTotalPrice(medicineId, parseFloat(totalPrice));
      // Clear the input field after updating the total price
      setNewTotalPrices({
        ...newTotalPrices,
        [medicineId]: '',

        
      });
    } else {
      alert('Please enter a valid total price.');

    }
    if (typeof onSuccess === 'function') { // Check if the prop is a function
      onSuccess(); // Call the function
  }

  if (typeof onUpdateTotalPrice === 'function') { // Check if the prop is a function
    onUpdateTotalPrice();  // Call the function
  }
  };

  const filteredMedicines = medicinenames.filter((medicine) =>
    medicine.drugName.drugName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <button
        className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all"
        onClick={() => setShowPopup(true)}
      >
        Update Total Price
      </button>
      {showPopup && (
        <div className="fixed top-40 left-0 w-full h-full flex items-start justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg w-256">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold mb-4">Update Total Price</h2>
              <span className="p-2 cursor-pointer" onClick={() => setShowPopup(false)}><MdClose className="text-gray-500 hover:text-gray-700 text-lg" /></span>
            </div>
            <input
              type="text"
              placeholder="Search by drug name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mb-4"
            />
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medicine Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Update
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMedicines.map((medicine) => (
                  <tr key={medicine.drugName._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{medicine.drugName.drugName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        value={newTotalPrices[medicine.drugName._id] || medicine.drugName.totalPrice}
                        onChange={(e) => handleTotalPriceChange(medicine.drugName._id, e)}
                        className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleUpdateTotalPrice(medicine.drugName._id)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <MdEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalPriceTable;