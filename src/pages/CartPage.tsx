import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../ContextApi/AppContext";
import { CartItem } from "../types/Cart";
import { Helmet } from "react-helmet-async";
import {
  Button,
  Card,
  CardBody,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { MessageBox } from "../components/MessageBox";
import { useCart } from "../hooks/cartHook";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    state: {
      mode,
      cart: { cartItems },
    },
  } = useContext(Context);

  const { fetchCart, updateCart, removeFromCart } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const updateCartHandler = (item: CartItem, quantity: number) => {
    if (quantity < 1) return removeFromCart(item._id);
    updateCart(item._id, quantity);
  };

  const removeItemHandler = (item: CartItem) => {
    removeFromCart(item._id);
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty, <Link to='/'>Go to Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item: CartItem) => (
                <ListGroup.Item key={item._id}>
                  <Row className='align-items-center'>
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='img-fluid rounded thumbnail'
                      />
                      {"  "}
                      <Link to={`/products/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant={mode}
                        disabled={item.quantity === 1}>
                        <i className='fas fa-minus-circle'></i>
                      </Button>{" "}
                      <span> {item.quantity}</span>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        variant={mode}
                        disabled={item.quantity === item.countInStock}>
                        <i className='fas fa-plus-circle'></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant={mode}>
                        {" "}
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <CardBody>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h3>
                    Subtotal({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items): $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroupItem>
                <ListGroupItem>
                  <div className='d-grid'>
                    <Button
                      variant='success'
                      type='button'
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}>
                      Check out
                    </Button>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartPage;
