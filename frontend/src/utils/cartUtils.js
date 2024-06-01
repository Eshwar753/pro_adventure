const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  export const updateCart = (state) => {
    state.itemsPrice = 
        addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty.toFixed(2), 0))
        ;
        console.log(state.itemsPrice)

      // Calculate the shipping price | If items price is greater than 100, shipping is free | If not, shipping is 10
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
      console.log(state.shippingPrice);

      // Calculate the tax price | Tax is 15% of the items price
      state.taxPrice = addDecimals(
        Number((0.15 * state.itemsPrice).toFixed(2))
        );
        console.log(state.taxPrice);

      // Calculate the total price | Total price is the sum of the items price, shipping price and tax price
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      console.log(state.totalPrice);

      localStorage.setItem('cart', JSON.stringify(state))

  }

  export {addDecimals} 