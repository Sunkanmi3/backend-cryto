import React, { useState, useEffect } from "react";
import { Button } from "../ButtonSection";
// import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  // const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <p className="navbar-logo">
            {/* <Link to="/" className="navbar-logo" onClick={closeMobileMenu}> */}
            BACK-END
            <i class="fab fa-typo3" />
            {/* </Link> */}
          </p>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {/* <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link
                to="/services"
                className="nav-links"
                onClick={closeMobileMenu}
              >
              Services
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link
                to="/products"
                className="nav-links"
                onClick={closeMobileMenu}
              >
              Products
              </Link>
            </li> */}

            <li>
              {/* <Link
                to="/sign-up"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              > */}
              <Link to={`${process.env.PUBLIC_URL}/auth-login`}>Sign in</Link>
              {/* </Link> */}
            </li>
          </ul>
            {button && (
              <Button buttonStyle="btn--outline">
                <Link to={`${process.env.PUBLIC_URL}/auth-register`}>SIGN UP</Link>
              </Button>
            )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
