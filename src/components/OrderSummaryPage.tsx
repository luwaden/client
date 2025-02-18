import { Card, ListGroup, Row, Col } from "react-bootstrap";

interface OrderSummaryProps {
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

export default function OrderSummary({
  itemsPrice,
  shippingPrice,

  totalPrice,
}: OrderSummaryProps) {
  return (
    <Card>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2>Order Summary</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Items:</Col>
            <Col>${itemsPrice.toFixed(2)}</Col>
          </Row>
          <Row>
            <Col>Shipping:</Col>
            <Col>${shippingPrice.toFixed(2)}</Col>
          </Row>

          <Row>
            <Col>
              <strong>Total:</strong>
            </Col>
            <Col>
              <strong>${totalPrice.toFixed(2)}</strong>
            </Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}
