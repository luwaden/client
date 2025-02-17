import React, { useState } from "react";
import { Container, Col, Row, Pagination } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import ProductItem from "../components/ProductItem";
import SearchBox from "../components/SearchBox";
import { useProducts } from "../hooks/products/useProducts";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const { products = [], isLoading, totalPages = 1, error } = useProducts(page);

  return (
    <Container>
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Row className='justify-content-center my-3'>
        <Col xs={12} md={6}>
          <SearchBox />
        </Col>
      </Row>

      <h2 className='text-center mt-4'>Featured Products</h2>
      <hr
        className='my-3'
        style={{ borderTop: "3px solid black", opacity: 1 }}
      />

      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <>
          <Row className='product-grid'>
            {products.length >= 7 && (
              <>
                {/* First Column: Two Rows */}
                <Col xs={12} md={4} className='product-column'>
                  <Row>
                    <Col xs={12} className='mb-4'>
                      <ProductItem product={products[0]} />
                    </Col>
                    <Col xs={12} className='mb-5'>
                      <ProductItem product={products[1]} />
                    </Col>
                    <Col xs={12}>
                      <ProductItem product={products[2]} />
                    </Col>
                  </Row>
                </Col>

                {/* Second Column: Three Rows */}
                <Col xs={12} md={8} className='product-column'>
                  <Row>
                    {/* First Row: Single Wide Product */}
                    <Col xs={12} className='mb-4'>
                      <ProductItem product={products[3]} />
                    </Col>
                    {/* Second Row: Three Products */}
                    <Col xs={12} md={4} className='mb-4'>
                      <ProductItem product={products[4]} />
                    </Col>
                    <Col xs={12} md={4} className='mb-4'>
                      <ProductItem product={products[5]} />
                    </Col>
                    <Col xs={12} md={4} className='mb-4'>
                      <ProductItem product={products[6]} />
                    </Col>
                    {/* Third Row: Single Wide Product */}
                    <Col xs={12}>
                      <ProductItem product={products[7]} />
                    </Col>
                  </Row>
                </Col>
              </>
            )}
          </Row>
          {/* Pagination Buttons */}
          <Pagination className='justify-content-center mt-4'>
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === page}
                onClick={() => setPage(i + 1)}>
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
            />
          </Pagination>
        </>
      )}
    </Container>
  );
};

export default HomePage;
