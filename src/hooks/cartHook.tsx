import { useContext } from "react";
import axios from "axios";
import { Context } from "../ContextApi/AppContext";
import { CartItem } from "../types/Cart";
import { toast } from "react-toastify";

export const useCart = () => {
  const { state, dispatch } = useContext(Context);
  const { userInfo } = state;

  const fetchCart = async () => {
    try {
      const { data } = await axios.get("/api/cart", {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      });
      dispatch({ type: "SET_CART", payload: data });
    } catch (error) {
      toast.error("Failed to fetch cart");
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    try {
      const { data } = await axios.post(
        "/api/cart/add",
        { userId: userInfo?._id, productId, quantity },
        { headers: { Authorization: `Bearer ${userInfo?.token}` } }
      );
      dispatch({ type: "SET_CART", payload: data });
      toast.success("Product added to cart");
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };

  const updateCart = async (productId: string, quantity: number) => {
    try {
      const { data } = await axios.put(
        "/api/cart/update",
        { userId: userInfo?._id, productId, quantity },
        { headers: { Authorization: `Bearer ${userInfo?.token}` } }
      );
      dispatch({ type: "SET_CART", payload: data });
      toast.success("Cart updated");
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const { data } = await axios.delete("/api/cart/remove", {
        data: { userId: userInfo?._id, productId },
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      });
      dispatch({ type: "SET_CART", payload: data });
      toast.success("Product removed from cart");
    } catch (error) {
      toast.error("Failed to remove product from cart");
    }
  };

  return { fetchCart, addToCart, updateCart, removeFromCart };
};
