import { useContext } from "react";
import axios from "axios";
import { Context } from "../ContextApi/AppContext";
import { CartItem } from "../types/Cart";
import { toast } from "react-toastify";
import apiClient from "../ApiClients";

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

  const addToCart = async (cartItems: CartItem[]) => {
    try {
      console.log(userInfo);
      const { data } = await axios.post(
        "localhost:5002/api/cart/add",
        {
          // userId: userInfo?._id,
          userId: "67adc3d203c2aaae9362790c",

          items: cartItems.map(({ _id, quantity }) => ({
            productId: _id,
            quantity,
          })),
        },
        {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        }
      );
      toast.success("Cart saved successfully");
      dispatch({ type: "SET_CART", payload: data });
      return true;
    } catch (error) {
      toast.error("Failed to save cart");
      return false;
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
