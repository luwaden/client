import React, { useContext } from "react";
import { Product } from "../types/Product";
import { Button, Card, CardBody, CardText, CardTitle } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { Context } from "../ContextApi/AppContext";
import { CartItem } from "../types/Cart";
import { convertProductToCartItem } from "../utils";
import { toast } from "react-toastify";

const ProductItem = ({
  product,
  isFeatured = false,
}: {
  product: Product;
  isFeatured?: boolean;
}) => {
  const { state, dispatch } = useContext(Context);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      toast.error("Sorry, this product is out of stock.");
      return;
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity },
    });
    toast.success("Product added to cart!");
  };

  return (
    <Card className={`shadow-sm ${isFeatured ? "featured-product" : ""}`}>
      <Link to={`/products/${product.slug}`}>
        <img
          src={product.image}
          className='card-img-top'
          alt={product.name}
          style={{ height: isFeatured ? "350px" : "250px", objectFit: "cover" }}
        />
      </Link>
      <CardBody>
        <Link to={`/products/${product.slug}`}>
          <CardTitle className='fw-bold'>{product.name}</CardTitle>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <CardText className='fs-5 fw-semibold'>${product.price}</CardText>
        {product.countInStock === 0 ? (
          <Button variant='danger' disabled>
            Out of Stock
          </Button>
        ) : (
          <Button
            variant='primary'
            onClick={() => addToCartHandler(convertProductToCartItem(product))}>
            Add to Cart
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default ProductItem;
