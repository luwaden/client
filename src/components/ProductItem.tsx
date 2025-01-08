import React, { useContext, useEffect } from "react";
import { Product } from "../types/Product";
import { Button, Card, CardBody, CardText, CardTitle } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { Context } from "../Context";
import { CartItem } from "../types/Cart";
import { convertProductToCartItem } from "../utils";
import { toast } from "react-toastify";

const ProductItem = ({ product }: { product: Product }) => {
  const { state, dispatch } = useContext(Context);

  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "UPDATE_CART",
      payload: { ...item, quantity },
    });
    toast.success("Product added to the cart");
  };

  return (
    <Card>
      <Link to={`/products/` + product.slug}>
        <img src={product.image} className='card-img-top' alt={product.name} />
      </Link>
      <CardBody>
        <Link to={`/products/` + product.slug}>
          <CardTitle>{product.name}</CardTitle>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <CardText>${product.price}</CardText>
        {product.countInStock === 0 ? (
          <Button variant='light' disabled>
            {" "}
            out of stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}>
            Add to Cart
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default ProductItem;
