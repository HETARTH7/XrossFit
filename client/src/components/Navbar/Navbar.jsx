import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

const Navbar = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2" to={"/user"}>
            Xrossfit
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
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ms-4">
                <Link className="nav-link" aria-current="page" to="/track">
                  Track
                </Link>
              </li>
              <li className="nav-item ms-4">
                <Link className="nav-link" to="/list">
                  Shop
                </Link>
              </li>
              <li className="nav-item ms-4">
                <Link className="nav-link" to="/store">
                  Get recommendation
                </Link>
              </li>
              <li className="nav-item ms-4">
                <Link className="nav-link" aria-current="page" to="/track">
                  Chat
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  alt=""
                  height={"40px"}
                  className="m-2 me-4 rounded-pill"
                />
              </li>

              <li className="nav-item nav-link">
                <button
                  style={{ background: "#96f2d7" }}
                  className="btn rounded"
                  onClick={handleClick}
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
