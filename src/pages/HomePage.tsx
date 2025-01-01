import React, { useEffect } from "react";
import { Col, Container, Nav, NavbarBrand, Row } from "react-bootstrap";
import { sampleProducts } from "../data";
import { Navbar } from "react-bootstrap";
import { Link, Links } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Product } from "../types/Product";
import axios from "axios";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";

type State = {
  products: Product[];
  loading: boolean;
  error: string;
};

type Action =
  | { type: "FETCH_REQUEST" }
  | { type: "FETCH_SUCCESS"; payload: Product[] }
  | { type: "FETCH_ERROR"; payload: string };

const initialState: State = {
  products: [],
  loading: true,
  error: "",
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const HomePage = () => {
  const [{ loading, error, products }, dispatch] = React.useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_ERROR", payload: getError(err as ApiError) });
      }
    };
    fetchData();
  }, []);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger'>{error}</MessageBox>
  ) : (
    <Row className=''>
      {products.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3}>
          <Link to={"/products/"}>
            <img
              src={product.image}
              alt={product.name}
              className='product-image'
            />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default HomePage;
