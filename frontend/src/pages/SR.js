import { useEffect, useState } from 'react';
import { useCommentsContext } from '../hooks/useCommentContext';
import CommentDetails from '../components/CommentDetails';
import CommentForm from '../components/CommentForm';
import TextField from '@mui/material/TextField';

const SalesReport = () => {
  const { comment, dispatch } = useCommentsContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]); // State to hold filtered items
  

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
    // Filter items based on search term whenever searchTerm changes
    const filteredComments = comment?.filter(
      (comments) => comments.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? []; // Ensure filtered is always an array
    setFilteredItems(filteredComments);
  }, [searchTerm, comment]);


  return (
    <div className="ml-64">
      <h1 className="text-2xl font-semibold text-gray-800 ">Sales Report</h1>

      
      <TextField
        type="text"
        lable="Search by title"
        size="small"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      

      <CommentForm />
      {filteredItems.map((comment) => (
        <CommentDetails key={comment._id} comments={comment} />
      ))}
    </div>
  );
};

export default SalesReport;
