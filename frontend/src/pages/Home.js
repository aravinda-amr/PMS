import { UserContextProvider } from "../context/UserContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from 'react-router-dom';

const Home = () => {
    const { user } = useAuthContext();

    if (user) {
        return <Navigate to="/" />;
    }

return (
    <div className="landing-page">
      <h1><center>welcome</center></h1>
      <div className="buttons">
        <button><a href="/login">Login</a></button>
        <button><a href="/signup">Signup</a></button>
      </div>
    </div>
  );
}

export default Home;