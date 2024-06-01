
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({_id, name, image, description, brand, price, rating, numReviews}) => {
  return (
    <Card className="p-3 my-3 rounded">
        <Link to={`/products/${_id}`}>
        <Card.Img src={image}/>
        </Link>
        <Card.Body>
            <Link to={`/products/${_id}`}>
            <Card.Title as='div' className="product-title">
                <strong>{name}</strong>
            </Card.Title>
            </Link>

            <Card.Text as="div">
              <Rating value= {rating} text= {`${numReviews}  reviews`} />
            </Card.Text>
  

            <Card.Text as="h3">
                ${price}
            </Card.Text>

           
        </Card.Body>
    </Card>
  )
};

export default Product;
