import React, { useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Badge,
  Button,
  Col,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavDropdown,
  Row,
} from "react-bootstrap";

import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { Context } from "../Context";

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Context);
  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };

  const signoutHandler = () => {
    dispatch({ type: "SIGNOUT_USER" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    navigate("/signin");
  };

  return (
    <div className='d-flex flex-column vh-100'>
      <ToastContainer position='bottom-center' limit={1} />
      <header>
        <Navbar expand='lg'>
          <Container>
            <Link to='/'>
              <NavbarBrand>Prox Commerce</NavbarBrand>
            </Link>
          </Container>
          <Nav>
            <Button variant={mode} onClick={switchModeHandler}>
              <i className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}></i>
            </Button>
            <Link to='/cart' className='nav-link'>
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg='danger'>
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            {userInfo ? (
              <NavDropdown title={userInfo.email} id='basic-nav-dropdown'>
                <Link
                  to='#signout'
                  className='dropdown-item'
                  onClick={signoutHandler}>
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link className='nav-Link' to='signin'>
                Sign In
              </Link>
            )}
          </Nav>
        </Navbar>
      </header>
      <hr
        className='my-3'
        style={{ borderTop: "3px solid black", opacity: 1 }}
      />
      <main>
        <Container className='mt-3'>
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className='text-center'>All rights reserved</div>
      </footer>
    </div>
  );
};

export default Dashboard;
