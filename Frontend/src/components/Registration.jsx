import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./registration.css";
import { toast } from "react-toastify";
const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/register", {
        username,
        password,
      });
      setMessage(response.data.message);
      toast.success("User register successfully");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error.response.data.message);
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="register form">
        <header>Signup</header>
        <form onSubmit={handleSubmit}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" className="btn btn-success w-100 p-3">
            <b>Register</b>
          </button>
        </form>
        <div className="signup">
          <span className="signup">
            Already have an account?
            <Link to="/login" className="btn btn-link">
              Login
            </Link>
          </span>
        </div>
      </div>

      {/* <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button> */}
      {/* </form> */}
      {message && (
        <p style={{ textAlign: "center", color: "red" }}>{message}</p>
      )}
    </div>
  );
};

export default Registration;
