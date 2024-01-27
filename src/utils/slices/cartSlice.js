import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: localStorage.getItem("total")
    ? JSON.parse(localStorage.getItem("total"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, value) {
      const course = value.payload;
      const existingCourseIndex = state.cart.findIndex(
        (item) => item._id === course._id
      );

      if (existingCourseIndex >= 0) {
        toast.error("Course already present in cart");
        return;
      }

      state.cart.push(course);
      state.total += course.price;
      state.totalItems++;

      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("total", JSON.stringify(state.total));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

      toast.success("Course added to cart");
    },
    removeFromCart(state, value) {
      const course = value.payload;
      const existingCourseIndex = state.cart.findIndex(
        (item) => item._id === course._id
      );
      if (existingCourseIndex >= 0) {
        state.total -= state.cart[existingCourseIndex].price;
        state.totalItems--;
        state.cart.splice(existingCourseIndex, 1);

        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem("total", JSON.stringify(state.total));
        localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

        toast.success("Course removed from cart");
      }
    },
    resetCart(state, value) {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;

      localStorage.removeItem("cart");
      localStorage.removeItem("total");
      localStorage.removeItem("totalItems");
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
