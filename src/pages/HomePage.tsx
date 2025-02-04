import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import ProductItem from "../components/ProductItem";
import { Helmet } from "react-helmet-async";
import { useGetProductsQuery } from "../hooks/productHooks";
import SearchBox from "../components/SearchBox";

const HomePage = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  return (
    <Container>
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      {/* 🟢 Search Section */}
      <Row className='justify-content-center my-3'>
        <Col xs={12} md={6}>
          <SearchBox />
        </Col>
      </Row>

      {/* 🟡 Product Section */}
      <Row>
        {isLoading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant='danger'>
            {getError(error as unknown as ApiError)}
          </MessageBox>
        ) : (
          products?.map((product) => (
            <Col key={product.slug} sm={6} md={4} lg={3} className='mb-4'>
              <ProductItem product={product} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
