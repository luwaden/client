import React, { useState } from "react";
import { Container, Col, Row, Pagination } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import ProductItem from "../components/ProductItem";
import SearchBox from "../components/SearchBox";
import { useProducts } from "../hooks/productHooks";

const HomePage = () => {
  const { products, isLoading, error } = useProducts();
  const [page, setPage] = useState(1);

  // Dummy Pagination: Assume there are 10 pages max
  const totalPages = 10;

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
          <Row>
            {/* Featured Products - Stacked */}
            <Col xs={12} md={6} className='d-flex flex-column'>
              {products.length > 1 && (
                <>
                  <div className='mb-4'>
                    <ProductItem product={products[0]} isFeatured />
                  </div>
                  <div>
                    <ProductItem product={products[1]} isFeatured />
                  </div>
                </>
              )}
            </Col>

            {/* Regular Products Beside Featured Products */}
            <Col xs={12} md={6}>
              <Row>
                {products.slice(2, 6).map((product) => (
                  <Col key={product.slug} xs={12} md={6} className='mb-4'>
                    <ProductItem product={product} />
                  </Col>
                ))}
              </Row>
            </Col>
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
