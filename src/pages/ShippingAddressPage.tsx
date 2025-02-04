import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";
import { Helmet } from "react-helmet-async";
import CheckoutSteps from "../components/CheckoutSteps";
import {
  Button,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";

const ShippingAddressPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);

  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({ fullName, address, city, postalCode, country })
    );
    navigate("/payment");
  };

  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className='container small-container'>
        <h1 className='my-3'>Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <FormGroup className='mb-3' controlId='fullName'>
            <FormLabel>Full Name</FormLabel>
            <FormControl
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required></FormControl>
          </FormGroup>

          <FormGroup className='mb-3' controlId='address'>
            <FormLabel>Address</FormLabel>
            <FormControl
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required></FormControl>
          </FormGroup>

          <FormGroup className='mb-3' controlId='city'>
            <FormLabel>City</FormLabel>
            <FormControl
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required></FormControl>
          </FormGroup>

          <FormGroup className='mb-3' controlId='postalCode'>
            <FormLabel>Postal Code</FormLabel>
            <FormControl
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required></FormControl>
          </FormGroup>

          <FormGroup className='mb-3' controlId='country'>
            <FormLabel>Country</FormLabel>
            <FormControl
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required></FormControl>
          </FormGroup>

          <FormGroup>
            <div className='mb-3'>
              <Button variant='primary' type='submit'>
                Continue
              </Button>
            </div>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default ShippingAddressPage;
