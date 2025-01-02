import { Product } from "../types/Product";
import { Button, Card, CardBody, CardText, CardTitle } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <Card>
      <Link to={`/products`}>
        <img src={product.image} className='card-img-top' alt={product.name} />
      </Link>
      <CardBody>
        <Link to={`/products`}>
          <CardTitle>{product.name}</CardTitle>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <CardText>${product.price}</CardText>
        {product.countInStock === 0 ? (
          <Button variant='light' disabled>
            {" "}
            out of stock
          </Button>
        ) : (
          <Button>Add to Cart</Button>
        )}
      </CardBody>
    </Card>
  );
};

export default ProductItem;
