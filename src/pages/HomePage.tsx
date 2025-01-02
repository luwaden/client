import React, { useEffect } from "react";
import { Col, Container, Nav, NavbarBrand, Row } from "react-bootstrap";
import { Product } from "../types/Product";
import axios from "axios";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import ProductItem from "../components/ProductItem";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../hooks/productHooks";

const HomePage = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant='danger'>
      {getError(error as unknown as ApiError)}
    </MessageBox>
  ) : (
    <Row className=''>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      {products!.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3}>
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default HomePage;
