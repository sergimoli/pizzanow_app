import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  //   cart: [
  //     {
  //       pizzaId: 12,
  //       name: 'Mediterranian',
  //       quantity: 2,
  //       unitPrice: 16,
  //       totalPrice: 32,
  //     },
  //   ],
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //payload = pizzaId
      //here we filter. whenver the piazza ID is different from the one that we passed in, so action.payload it will still be part of the new cart.
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      //when we decreasse the quantittiy from 1 to zero that element is taken out, so we want to delete that item. We can do this nice solution that is to call an already existing reducer that does the same, nice, no? jeje!
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;
export const getUserName = (state) => state.user.username;

//current acumulator: sum. Current element of the array: item
//in each iteration we will add to the current sum wich starts at zero as the second argument. So, that sum that starts at zero in each iteration we will add the item.quantity. IT'S A GOOD PRACTICE USING REDUX
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

//here the id is the argument and then what this should return is a selector of this type. So, a function that receives a state and then returns something (try to find an item in the cart with this pizza id and if there is one then return the quantity. otherwise we just return 0.)
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

//the above function can be rewrited to this way:
// export function getCurrentQuantityById(id) {
//   return function(state) {
//     const item = state.cart.cart.find((item) => item.pizzaId === id);
//     return item ? item.quantity : 0;
//   };
// }

//we can use the 'reselect' library that allows to optimize these selectors. But we are not using this in this project.
