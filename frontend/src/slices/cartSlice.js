import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState= localStorage.getItem("cart") 
? JSON.parse(localStorage.getItem("cart")) 
: {cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal'};



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart: (state, action)=>{
            const item= action.payload

            const existItem = state.cartItems.find(i => i._id === item._id);

            if (existItem) {
                // If exists, update quantity
                state.cartItems = state.cartItems.map((x) =>
                  x._id === existItem._id ? item : x
                );
              } else {
                // If not exists, add new item to cartItems
                state.cartItems = [...state.cartItems, item];
              }

             return updateCart(state);
        
        },
        removeFromCart: (state, action)=>{
          state.cartItems = state.cartItems.filter(item=> item._id !== action.payload);

          return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
          state.shippingAddress = action.payload;
          return updateCart(state);
        },
        savePaymentMethod: (state, action) => {
          state.paymentMethod = action.payload;
          return updateCart(state);
        },
        clearCartItems: (state, action) => {
          state.cartItems = [];
         return updateCart(state);
        },
    },
});

export const {addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems} = cartSlice.actions;

export default cartSlice.reducer 