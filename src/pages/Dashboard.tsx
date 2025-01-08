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
  Row,
} from "react-bootstrap";

import { Link, Outlet } from "react-router-dom";
import { Context } from "../Context";

const Dashboard = () => {
  const {
    state: { mode, cart },
    dispatch,
  } = useContext(Context);
  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  });

  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
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
            <a href='/signin' className='nav-link'>
              Sign in
            </a>
          </Nav>
        </Navbar>
      </header>
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
