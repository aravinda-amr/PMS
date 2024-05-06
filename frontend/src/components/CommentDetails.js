import { useState } from "react";
import { useCommentsContext } from "../hooks/useCommentContext";

//date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const CommentDetails = ({ comments }) => {
  const { dispatch } = useCommentsContext();
  const [showPopup, setShowPopup] = useState(false);
  const [note, setNote] = useState(comments.note);

  const handleClick = async () => {
    const response = await fetch("/api/salesreport/" + comments._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_COMMENTS", payload: json });
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleUpdate = () => {
    togglePopup(); // Toggle the popup visibility
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/salesreport/" + comments._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note }),
    });
    const json = await response.json();
    dispatch({ type: "UPDATE_COMMENTS", payload: json });
    togglePopup(); // Close the popup after updating
  };

  return (
    <div className="bg-dark-blue-2 p-4 rounded-lg shadow-md mr-4 my-4 ml-6 text-white">
      <h4>
        <strong>Verified By : </strong>
        {comments.title}
      </h4>
      <p>
        <strong>Date : </strong>
        {new Date(comments.day).toLocaleDateString()}
      </p>
      <p>
        <strong>Special Notes: </strong>
        {comments.note}
      </p>
      <p>
        {formatDistanceToNow(new Date(comments.createdAt), { addSuffix: true })}
      </p>
      <button
        className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 mt-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all"
        style={{ color: "black" }}
        onClick={handleClick}
      >
        Delete
      </button>
      <button
        className="btn bg-signup1 hover:bg-signup2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all"
        style={{ color: "black" }}
        onClick={handleUpdate}
      >
        Edit
      </button>
      {showPopup && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
              <div className="bg-box shadow-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3
                  className="text-lg leading-6 font-medium text-black"
                  id="modal-title"
                >
                  Update Note
                </h3>
                <div className="mt-2">
                  <form onSubmit={handleSubmit}>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full color-black px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-black dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                      placeholder="Write Note"
                    />
                    <div className="mt-4 flex justify-end">
                      <button
                        type="submit"
                        className="btn bg-signup1 hover:bg-signup2 hover:text-black mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all"
                      >
                        Update
                      </button>
                      <button
                        type="button"
                        onClick={togglePopup}
                        className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentDetails;
