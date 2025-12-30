import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    console.log("Logout successfull!");
    navigate("/login");
  };
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand text-primary" href="/">
          iNotebook
        </a>
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
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/profile" ? "active" : ""
                }`}
                to="/profile"
              >
                Profile
              </Link>
            </li>
          </ul>
          {localStorage.getItem("token") ? (
            <button
              className="btn-primary py-1 px-2"
              aria-current="page"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <div>
              <Link className="nav-link" aria-current="page" to="/login">
                Login
              </Link>
              <Link className="nav-link" aria-current="page" to="/signup">
                SignUp
              </Link>
            </div>
          )}
          <div className="d-flex"></div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
