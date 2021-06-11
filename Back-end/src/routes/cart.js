const express=require('express');
const {addToCart,getCartItems}=require('../controller/cart');
const { requireSignin, userMiddleware } = require('../middleware');
const router=express.Router();

router.post('/user/cart/addtocart',requireSignin,userMiddleware,addToCart);
router.post('/user/getCartItems',
// requireSignin,
// userMiddleware,
getCartItems);

module.exports=router;