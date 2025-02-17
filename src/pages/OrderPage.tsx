import { useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Context } from "../ContextApi/AppContext";
import { useOrder } from "../hooks/orderHooks";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";

export default function OrderPage() {
  const { state } = useContext(Context);
  const { userInfo } = state;
  const { id: orderId } = useParams();

  const token = typeof userInfo?.token === "string" ? userInfo.token : "";
  const { order, isLoading, error } = useOrder(orderId!, token);

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger'>{error}</MessageBox>
  ) : !order ? (
    <MessageBox variant='danger'>Order Not Found</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 className='my-3'>Order {orderId}</h1>
      <Row>
        <Col md={8}>
          <Card className='mb-3'>
            <CardBody>
              <CardTitle>Shipping</CardTitle>
              <CardText>
                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                <strong>Address:</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                , {order.shippingAddress.country}
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
