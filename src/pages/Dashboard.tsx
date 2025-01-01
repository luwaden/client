import React from "react";
import { Col, Container, Nav, Navbar, NavbarBrand, Row } from "react-bootstrap";
import { sampleProducts } from "../data";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className='d-flex flex-column vh-100'>
      <header>
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Container>
            <NavbarBrand>Prox Commerce</NavbarBrand>
          </Container>
          <Nav>
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
