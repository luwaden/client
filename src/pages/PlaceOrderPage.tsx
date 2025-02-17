import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import {
  Button,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  CardBody,
} from "react-bootstrap";
import { Context } from "../ContextApi/AppContext";
import { usePlaceOrder } from "../hooks/usePlaceOrder";
import { LoadingBox } from "../components/LoadingBox";
import { log } from "console";

export default function PlaceOrderPage() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Context);
  const { cart, userInfo } = state;

  // 🛠 Fix: Ensure token is properly checked before passing
  const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
  console.log(user);
  const { isLoading, error, success, order, placeOrder } = usePlaceOrder(
    user.data ? user.data : ""
  );

  useEffect(() => {
    if (success && order) {
      navigate(`/order/${order._id}`);
    }
  }, [success, order, navigate]);

  const placeOrderHandler = async () => {
    try {
      await placeOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      });

      // 🛠 Fix: Ensure "CART_CLEAR" action exists
      ctxDispatch({ type: "CART_CLEAR" });
    } catch (err) {
      toast.error(error);
    }
  };

  return (
    <div>
      <Helmet title='Place Order' />
      <h1 className='my-3'>Preview Order</h1>
      <Row>
        <Col md={8}>
          <Card className='mb-3'>
            <CardBody>
              <Card.Title>Shipping</Card.Title>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                  <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  , {cart.shippingAddress.country}
                </ListGroup.Item>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardBody>
              <ListGroup variant='flush'>
                <ListGroupItem>
                  <h2>Order Summary</h2>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Items:</Col>
                    <Col>${cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>${cart.shippingPrice.toFixed(2)}</Col>
                  </Row>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>${cart.taxPrice.toFixed(2)}</Col>
                  </Row>
                  <Row>
                    <Col>
                      <strong>Order Total:</strong>
                    </Col>
                    <Col>
                      <strong>${cart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  {isLoading && <LoadingBox />}
                  <Button
                    type='button'
                    onClick={placeOrderHandler}
                    disabled={cart.cartItems.length === 0}>
                    Place Order
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
