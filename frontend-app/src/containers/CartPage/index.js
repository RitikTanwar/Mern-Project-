import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Card from '../../components/UI/Card'
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import { addToCart,getCartItems } from '../../actions/cart';
import './style.css'

const CartPage = (props) => {
    const cart = useSelector(state => state.cart);
    const auth=useSelector(state=>state.auth)
    // const cartItems = cart.cartItems;
    const[cartItems,setCartItems]=useState(cart.cartItems); 
    const dispatch=useDispatch()
   
    useEffect(()=>{
        setCartItems(cart.cartItems);
    },[cart.cartItems])

    useEffect(()=>{
        if(auth.authenticate){
            dispatch(getCartItems());
        }
    },[auth.authenticate])
    
    const onQuantityIncrement=(_id,qty)=>{
        console.log(qty);
        const {name,price,img}=cartItems[_id];
        dispatch(addToCart({ _id, name, price, img },1));
    }
    const onQuantityDecrement=(_id,qty)=>{
        console.log(qty);
        const {name,price,img}=cartItems[_id];
        dispatch(addToCart({ _id, name, price, img },-1));
    }
    return (
        <Layout >
            <div className="cartContainer">
                <Card
                    headerLeft={'My Cart'}
                    headerRight={'Delvier to'}
                >
                    {
                        Object.keys(cartItems).map((keys, index) =>
                            <CartItem 
                                key={index}
                                cartItem={cartItems[keys]}
                                onQuantityInc={onQuantityIncrement}
                                onQuantityDec={onQuantityDecrement}
                            >

                            </CartItem>
                            // <div key={index} className="flexRow">
                            //     <div className="cartProductContainer">
                            //         <img src="" />
                            //     </div>
                             //     <div className="cartItemDetails">
                            //         <div>
                            //             {cartItems[keys].name}
                            //         </div>
                            //         <div>
                            //             QTN= {cartItems[keys].qty}
                            //         </div>
                            //         <div>Delivery in 3-5 days</div>
                            //     </div>
                            // </div>
                        )
                    }

                </Card>
                <Card 
                    headerLeft='Price'
                    style={{
                        width: '500px',
                    }}
                >
                    {/* {} */}
                </Card>
            </div>
        </Layout>
    )
}

export default CartPage
