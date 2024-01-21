import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { token, setToken } = useContext(AuthContext);
  const [user, setUser] = useState(null); // New state to store user information
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user information when token changes
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get("http://localhost:8080/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Failed to fetch user:", error);
        }
      }
    };

    fetchUser();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username,
        password,
      });
      setToken(response.data);
      localStorage.setItem("token", response.data);
      toast.success("Login Successful");
      navigate("/home");
    } catch (error) {
      console.error("Authentication failed:", error);
      setToken(null);
      localStorage.removeItem("token");
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div>
        <div className="login form">
          <header>Login</header>
          {user ? (
            <div>
              <p>Welcome, {user.username}!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
              <div className="d-flex justify-content-between">
                <a href="#">Forgot password?</a>
                <Link to="/register">New User</Link>
              </div>
              <button type="submit" className="btn btn-success w-100 p-3 my-2">
                <b>Login</b>
              </button>
            </form>
          )}
        </div>
        {errorMessage && (
          <div style={{ color: "red" }}>
            <p style={{ textAlign: "center" }}>{errorMessage.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
