const Cart = require('../models/cart');

function runUpdate(condition, updateData) {
    return new Promise((resolve, reject) => {
        Cart.findOneAndUpdate(condition, updateData,{upsert:true})
            .then(result=>resolve())
            .catch(err=>reject(err))
    })
}

exports.addToCart = (req, res) => {

    Cart.findOne({ user: req.user._id })
        .exec((err, cart) => {
            if (err) return res.status(400).json({ err });
            if (cart) {
                // res.status(200).json({message:cart});
                // if cart already exist update the quantity and price
                let promiseArray = [];
                // console.log(cart.cartItems);
                req.body.cartItems.forEach((cartItem) => {
                    const product = cartItem.product;
                    const isAdded = cart.cartItems.find(item => item.product == product);
                    let condition, update;
                    if (isAdded) {
                        condition = { "user": req.user._id, "cartItems.product": product };
                        update = {
                            "$set": {
                                "cartItems.$": {
                                    // ...req.body.cartItems,
                                    // quantity: isAdded.quantity + req.body.cartItems.quantity
                                    cartItem
                                }
                            }
                        }
                    }
                    else {
                        condition = { user: req.user._id };
                        update = {
                            "$push": {
                                "cartItems":
                                    // req.body.cartItems
                                    cartItem
                            }
                        }
                    }
                    promiseArray.push(runUpdate(condition, update))
                })
                Promise.all(promiseArray)
                .then(response=>res.status(201).json({response}))
                .catch(err=>res.status(400).json({err}))
            } 
            else {
                // If cart don't exists 
                const cart = new Cart({
                    user: req.user._id,
                    cartItems: req.body.cartItems
                });
                cart.save((err, cart) => {
                    if (err) return res.status(400).json({ err });
                    if (cart) {
                        return res.status(201).json({ cart });
                    }
                })
            }
        })

}

exports.getCartItems = (req, res) => {
    //const { user } = req.body.payload;
    //if(user){
    Cart.findOne({ user: req.user._id })
      .populate("cartItems.product", "_id name price productImages")
      .exec((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          let cartItems = {};
          cart.cartItems.forEach((item, index) => {
            cartItems[item.product._id.toString()] = {
              _id: item.product._id.toString(),
              name: item.product.name,
              img: item.product.productImages[0].img,
              price: item.product.price,
              qty: item.quantity,
            };
          });
          res.status(200).json({ cartItems });
        }
      });
    //}
  };
  
  // new update remove cart items
//   exports.removeCartItems = (req, res) => {
//     const { productId } = req.body.payload;
//     if (productId) {
//       Cart.update(
//         { user: req.user._id },
//         {
//           $pull: {
//             cartItems: {
//               product: productId,
//             },
//           },
//         }
//       ).exec((error, result) => {
//         if (error) return res.status(400).json({ error });
//         if (result) {
//           res.status(202).json({ result });
//         }
//       });
//     }
//   };