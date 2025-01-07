import React, { useContext, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  Row,
} from "react-bootstrap";
import { sampleProducts } from "../data";
import { Link, Outlet } from "react-router-dom";
import { Store } from "../Store";

const Dashboard = () => {
  const {
    state: { mode },
    dispatch,
  } = useContext(Store);
  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  });

  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };

  return (
    <div className='d-flex flex-column vh-100'>
      <header>
        <Navbar expand='lg'>
          <Container>
            <NavbarBrand>Prox Commerce</NavbarBrand>
          </Container>
          <Nav>
            <Button variant={mode} onClick={switchModeHandler}>
              <i className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}></i>
            </Button>
            <a href='/cart' className='nav-link'>
              Cart
            </a>
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
