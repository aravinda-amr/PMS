import {useEffect} from 'react'
import {useCommentsContext} from '../hooks/useCommentContext'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// components
import CommentDetails from '../components/CommentDetails'
import CommentForm from '../components/CommentForm'
import '../App.css'



const SR = () => {
  const {comment, dispatch} = useCommentsContext()

  useEffect(() => {

    const fetchWorkouts = async () => {
      const response= await fetch('/api/comments')
      const json = await response.json()

      if(response.ok){
        dispatch({type:'SET_COMMENTS', payload: json})
      }

    }

    fetchWorkouts()
  },[dispatch])

  const data = [
    { name: "Facebook", Medicine: 20000000 },
    { name: "Instagram", Medicine: 15000000 },
    { name: "Twiter", Medicine: 10000000 },
    { name: "Telegram", Medicine: 5000000 },
  ];

  const data2 = [
    { name: "AAAA", Medicine: 10000000 },
    { name: "BBBB", Medicine: 25000000 },
    { name: "CCCC", Medicine: 20000000 },
    { name: "DDDD", Medicine: 5500000 },
  ];

  return(
    <div>
    <div className="sr">
      <div className="workouts">
        {comment && comment.map((comments) =>(
          <CommentDetails key={comments._id} comments={comments} />
        ))}
        </div>
        <CommentForm />
    </div>


    <h3>High-demand products within a week</h3>
      
      <div className="graph">
      <BarChart
          width={600}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Medicine" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
        
        
        <BarChart
          width={600}
          height={400}
          data={data2}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Medicine" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
        
      </div>


    </div>
  )
}

export default SR