import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";

const CartPage = () => {
  const navigate = useNavigate();
  const {
    state: {
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Context);
  return <div>CartPage</div>;
};

export default CartPage;
