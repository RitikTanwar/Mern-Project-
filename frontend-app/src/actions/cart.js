import axios from "../helpers/axios";
import { cartConstants } from "./constants";
import store from "../store";

const getCartItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const res = await axios.post(`/user/getCartItems`);
      if (res.status === 200) {
        const { cartItems } = res.data;
        console.log({ getCartItems: cartItems });
        if (cartItems) {
          dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addItemsToCart = (product, QTY = 1) => {
  console.log("Product", product);
  return async (dispatch) => {
    const {
      cart: { cartItems },
      auth,
    } = store.getState();
    // const {products}=store.getState().cart;
    // console.log('action::products', products);
    //const product = action.payload.product;
    //const products = state.products;
    const qty = cartItems[product._id]
      ? parseInt(cartItems[product._id].qty + QTY)
      : 1;
    cartItems[product._id] = {
      ...product,
      qty,
    };
    console.log("Cart  Action", cartItems);
    // localStorage.setItem('cart',JSON.stringify(cartItems))
    if (auth.authenticate) {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const payload = {
        cartItems: [
          {
            product: product._id,
            quantity: qty,
            ...product,
          },
        ],
      };
      console.log("Payload", payload);
      const res = await axios.post(`/user/cart/addtocart`, payload);
      console.log(res.status);
      if (res.status === 201) {
        console.log("GETCart", res);
        dispatch(getCartItems());
      }
    } else {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    console.log("addToCart=>", cartItems);

    dispatch({
      //   type: cartConstants.ADD_TO_CART_SUCCESS,
      type: cartConstants.ADD_TO_CART_SUCCESS,
      payload: { cartItems },
    });
  };
};

export const removeCartItem = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
      const res = await axios.post(`/user/cart/removeItem`, { payload });
      if (res.status === 202) {
        dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
        dispatch(getCartItems());
      } else {
        const { error } = res.data;
        dispatch({
          type: cartConstants.REMOVE_CART_ITEM_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCart = () => {
  return async (dispatch) => {
    const { auth } = store.getState();
    let cartItems = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : null;

    console.log(cartItems);
    if (cartItems) {
      console.log(cartItems);
      dispatch({
        type: cartConstants.ADD_TO_CART_REQUEST,
        payload: { cartItems },
      });
    }
    if (auth.authenticate) {
      localStorage.removeItem("cart");
      //dispatch(getCartItems());
      if (cartItems) {
        console.log("Carrrrr", cartItems);
        const payload = {
          cartItems: Object.keys(cartItems).map((key, index) => {
            return {
              product: cartItems[key]._id,
              quantity: cartItems[key].qty,
            };
          }),
        };
        if (Object.keys(cartItems).length > 0) {
          console.log(cartItems);
          const res = await axios.post(`/user/cart/addtocart`, payload);
          if (res.status === 201) {
            dispatch(getCartItems());
          }
        }
      } else {
        dispatch(getCartItems());
      }
    } else {
      if (cartItems) {
        dispatch({
          type: cartConstants.ADD_TO_CART_SUCCESS,
          payload: { cartItems },
        });
      }
    }
  };
};

export { getCartItems };
