import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    // Clear the authentication token
    e.preventDefault();
    setToken(null);

    // Redirect to the login page or any other desired page
    navigate("/login");
  };

  return (
    <div>
      {/* Navigation*/}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-5">
          <Link className="navbar-brand" to="/home">
            DropShipping
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
              <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/shop">
                  SHOP
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">BRANDS</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  PRODUCTS
                </Link>
              </li>
            </ul>
            <form className="d-flex gap-2">
              <button className="btn btn-outline-dark" type="button">
                <i className="bi-cart-fill me-1" />
                Cart
                <span className="badge bg-dark text-white ms-1 rounded-pill">
                  0
                </span>
              </button>

              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
