import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useGetProductsDetailsBySlugQuery } from "../hooks/productHooks";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating";

const ProductPage = () => {
  const params = useParams();
  const { slug } = params;
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductsDetailsBySlugQuery(slug!);

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger'>
      {" "}
      {getError(error as unknown as ApiError)}{" "}
    </MessageBox>
  ) : !product ? (
    <MessageBox variant='danger'> Product Not Found</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img className='large' src={product.image} alt={product.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <Helmet>
                <title> {product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroupItem>
            <ListGroupItem>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}></Rating>
            </ListGroupItem>

            <ListGroupItem>Price: ${product.price}</ListGroupItem>
            <ListGroupItem>
              Description:
              <p>{product.description}</p>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <CardBody>
              <ListGroup>
                <ListGroupItem>
                  <Row>
                    <Col> Price:</Col>
                    <Col> ${product.price}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col> Status:</Col>
                    <Col>
                      {" "}
                      {product.countInStock > 0 ? (
                        <Badge bg='success'> in stock</Badge>
                      ) : (
                        <Badge bg='danger'> unavailable</Badge>
                      )}{" "}
                    </Col>
                  </Row>
                </ListGroupItem>
                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <div className='d-grid'>
                      <Button variant='primary'>Add to cart</Button>
                    </div>
                  </ListGroupItem>
                )}
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
