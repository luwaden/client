import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { convertProductToCartItem, getError } from "../utils";
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
import { Context } from "../ContextApi/AppContext";
import { toast } from "react-toastify";
import { useProductBySlug } from "../hooks/products/useProductBySlug";

const ProductPage = () => {
  const { slug } = useParams();
  const { isLoading, error, product } = useProductBySlug(slug!);
  const { state, dispatch } = useContext(Context);
  const navigate = useNavigate();

  const addToCartHandler = () => {
    if (!product) return;
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      toast.warn("Sorry, this product is out of stock.");
      return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: { ...convertProductToCartItem(product), quantity },
    });
    toast.success("Product added to cart!");
    navigate("/cart");
  };

  if (isLoading) return <LoadingBox />;
  if (error) return <MessageBox variant='danger'>{getError(error)}</MessageBox>;
  if (!product)
    return <MessageBox variant='danger'>Product Not Found</MessageBox>;

  return (
    <div>
      <Helmet>
        <title>{product.name}</title>
      </Helmet>

      <Row>
        <Col md={6}>
          <img
            className='img-fluid rounded shadow'
            src={product.image}
            alt={product.name}
          />
        </Col>

        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h1 className='fw-bold'>{product.name}</h1>
            </ListGroupItem>
            <ListGroupItem>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroupItem>
            <ListGroupItem>
              <strong>Price:</strong> ${product.price}
            </ListGroupItem>
            <ListGroupItem>
              <strong>Description:</strong>
              <p>{product.description}</p>
            </ListGroupItem>
          </ListGroup>
        </Col>

        {/* 📌 Cart Actions */}
        <Col md={3}>
          <Card>
            <CardBody>
              <ListGroup>
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg='success'>In Stock</Badge>
                      ) : (
                        <Badge bg='danger'>Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroupItem>
                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Button
                      className='w-100'
                      onClick={addToCartHandler}
                      variant='primary'>
                      Add to Cart
                    </Button>
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
