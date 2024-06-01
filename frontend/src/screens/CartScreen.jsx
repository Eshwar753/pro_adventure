
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button, Form, Image, ListGroup } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/message";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import {addDecimals} from '../utils/cartUtils'


const CartScreen = () => {

    const navigate = useNavigate();
    const dispatch= useDispatch();


    const {cartItems} = useSelector((state)=> state.cart)

    const addToCartHandler = async(product, qty)=> {
         dispatch(addToCart({...product, qty}));
    }

    const removeFromCartHandler = async(id)=> {
        dispatch(removeFromCart(id))
   }

   const checkoutHandler= ()=>{
    navigate('/login?redirect=/shipping');
   }

    return (
        <Row>
            <Col md={8}>
            <h1 style={{marginBottom:'20px'}}>Shopping Cart</h1>
            {
                cartItems.length === 0 ? (
                    <Message >
                    Your cart has no items <strong><Link to='/'>Go Back</Link></strong>
                </Message>
                ) : (<ListGroup variant="flush">
                   {
                    cartItems.map((item)=>(
                        <ListGroup.Item key={item._id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} rounded fluid />  
                                </Col>
                                <Col md={3}>
                                    <Link to={`/products/${item._id}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                ${item.price}</Col>
                                <Col md={2}>
                                    <Form.Control
                                        as='select'
                                        value={item.qty}
                                        onChange={(e)=>{addToCartHandler(item , Number(e.target.value))}}>
                                        {
                                            [...Array(item.countInStock).keys()].map((x)=>
                                            (<option key={x+1} value={x+1}>{x+1}</option>)
                                        )
                                        }

                                    </Form.Control>

                                </Col>
                                <Col md={2}>
                                    <Button type="button" variant="light" onClick={()=>removeFromCartHandler(item._id)}>
                                        <FaTrash />
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))
                   }
                </ListGroup>)
            }

            </Col>
            <Col md={4}>
                <ListGroup>
                    <ListGroup.Item>
                        <h2>
                            Subtotal ({ cartItems.reduce((acc, item) => acc + item.qty,0)})
                        </h2>
                        ${addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty.toFixed(2), 0))}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type="button" className="btn-block" disabled={cartItems.length === 0} 
                        onClick={()=> checkoutHandler()}>
                            Proceed to checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Col>
        </Row>
    )
        }

export default CartScreen;
