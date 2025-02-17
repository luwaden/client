import React, { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { Context } from "../ContextApi/AppContext";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Context);

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const switchMode = () => {
    dispatch({ type: "SWITCH_MODE" });
  };

  const signOut = () => {
    dispatch({ type: "SIGNOUT_USER" });
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div className='d-flex flex-column vh-100'>
      <ToastContainer position='bottom-center' limit={1} />

      {/* Header Section */}
      <header>
        <Navbar expand='lg' className='px-3'>
          <Container>
            <Link to='/'>
              <NavbarBrand>Prox</NavbarBrand>
            </Link>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto align-items-center'>
                <Button variant={mode} onClick={switchMode} className='me-2'>
                  <i
                    className={
                      mode === "light" ? "fa fa-sun" : "fa fa-moon"
                    }></i>
                </Button>

                <Link to='/cart' className='nav-link me-3'>
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg='danger'>
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>

                {userInfo ? (
                  <div className='position-relative'>
                    <FontAwesomeIcon
                      icon={faUser}
                      className='cursor-pointer'
                      onClick={() => setShowDropdown(!showDropdown)}
                    />
                    {showDropdown && (
                      <div
                        className='position-absolute bg-white shadow-sm p-2 rounded'
                        style={{ right: 0, top: "100%", minWidth: "150px" }}>
                        <Link
                          to='/profile'
                          className='dropdown-item'
                          onClick={() => setShowDropdown(false)}>
                          Edit Profile
                        </Link>
                        <Link
                          to='#signout'
                          className='dropdown-item'
                          onClick={signOut}>
                          Sign Out
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link className='nav-link' to='/signin'>
                    User Name
                  </Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <hr
        className='my-3'
        style={{ borderTop: "3px solid black", opacity: 1 }}
      />

      {/* Main Content */}
      <main>
        <Container className='mt-3'>
          <Outlet />
        </Container>
      </main>

      {/* Footer Section */}
      <footer className='text-center mt-auto py-3'>
        <div>All rights reserved</div>
      </footer>
    </div>
  );
};

export default Dashboard;
