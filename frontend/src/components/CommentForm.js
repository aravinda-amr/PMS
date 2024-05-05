// Import the necessary libraries
import { useState } from "react";
import { useCommentsContext } from "../hooks/useCommentContext";

// Define the CommentForm component
const CommentForm = () => {
  // Use the comments context
  const { dispatch } = useCommentsContext();

  // Initialize state variables
  const [title, setTitle] = useState("");
  const [day, setDay] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!title || !day || !note) {
      setError("All fields are required.");
      return;
    }

    // Create a new comment object
    const comment = { title, day, note };

    // Send the comment data to the server
    const response = await fetch("/api/salesreport", {
      method: "POST",
      body: JSON.stringify(comment),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    // Handle the response from the server
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      // Reset form fields
      setTitle("");
      setDay("");
      setNote("");

      // Clear error and emptyFields
      setEmptyFields([]);
      setError(null);

      // Log success message and dispatch action to update context
      console.log("new comment added", json);
      dispatch({ type: "CREATE_COMMENTS", payload: json });

      // Close the popup
      setShowPopup(false);
    }
  };

  // Toggle the visibility of the popup
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Close the popup
  const handleCancel = () => {
    setShowPopup(false);
  };

  // Get the current date in the format YYYY-MM-DD
  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <>
      {/* Button to toggle the popup */}
      <button
        onClick={togglePopup}
        className="btn ml-8 bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all"
      >
        Add a Comment
      </button>

      {/* Popup form */}
      {showPopup && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Add a Comment
                </h3>
                <div className="mt-2">
                  {/* Form with date input restricted to current date and future dates */}
                  <form
                    onSubmit={handleSubmit}
                    className="bg-dark-blue-2 p-4 rounded-lg shadow-md"
                  >
                    <label className="label-form block text-sm font-medium text-white">
                      Verified By:
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      className="focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-blue"
                    />

                    <label className="label-form block text-sm font-medium text-white">
                      Special Notes:
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setNote(e.target.value)}
                      value={note}
                      className="focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-blue"
                    />

                    <label className="label-form block text-sm font-medium text-white">
                      Date:
                    </label>
                    <input
                      type="date"
                      min={currentDate} // Set min attribute to current date
                      onChange={(e) => setDay(e.target.value)}
                      value={day}
                      className="focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-blue"
                    />

                    {/* Submit and cancel buttons */}
                    <button className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all"
                    >
                      Cancel
                    </button>

                    {/* Display error message if there is an error */}
                    {error && <div className="error">{error}</div>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Export the CommentForm component
export default CommentForm;
