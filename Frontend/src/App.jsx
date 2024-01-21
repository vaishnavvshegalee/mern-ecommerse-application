import React, { useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "./components/AuthContext";
import Login from "./components/Login";
import Home from "./components/Home";
import Registration from "./components/Registration";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Shop from "./components/Shop";
import PropTypes from "prop-types";

function ProtectedRoute({ element }) {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  if (isAuthenticated) {
    return element;
  } else {
    // Redirect to login and store the intended path in state
    navigate("/login", {
      replace: true,
      state: { from: window.location.pathname },
    });
    return null; // Render nothing while navigating
  }
}

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />

          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/products"
            element={<ProtectedRoute element={<Products />} />}
          />
          <Route path="/shop" element={<ProtectedRoute element={<Shop />} />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
