import { useNavigate } from "react-router-dom";

import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context";
import CheckoutSteps from "../components/CheckoutSteps";
import { Helmet } from "react-helmet-async";
import { Button, Form, FormCheck } from "react-bootstrap";

const PaymentMethodPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Context);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "PayStack"
  );
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeholder");
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <div className='container small-container'>
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className='my-3'>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className='mb-3'>
            <FormCheck
              type='radio'
              id='PayStack'
              label='PayStack'
              value='PayStack'
              checked={paymentMethodName === "PayStack"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>

          <div className='mb-3'>
            <FormCheck
              type='radio'
              id='PayPal'
              label='PayPal'
              value='PayPal'
              checked={paymentMethodName === "PayPal"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <Button type='submit'> Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PaymentMethodPage;
