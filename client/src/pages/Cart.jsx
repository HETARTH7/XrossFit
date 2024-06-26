import React, { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../utils/useAuthContext";
import Navbar from "../components/Navbar";
import Error from "../components/Error";
import Success from "../components/Success";
import axios from "../api/axios";
import Stripe from "react-stripe-checkout";

const Cart = () => {
  const { user } = useAuthContext();
  const [cartItems, setCartItems] = useState([]);
  const [order, setOrder] = useState([]);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchCart = useCallback(async () => {
    try {
      const response = await axios.get(`/order/cart/${user.email}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.data;
      if (data.length > 0) {
        setCartItems(data[0].products);
        setOrder(data[0]);
      } else {
        setCartItems([]);
        setOrder([]);
      }
    } catch (error) {
      setError(error.message);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [fetchCart, user]);

  const handleIncrement = async (item) => {
    try {
      const response = await axios.post(
        "/order",
        {
          user: user.email,
          product: item.product,
          price: item.price,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.data;
      setSuccess(json);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDecrement = async (item) => {
    try {
      const response = await axios.put(
        "/order/cart",
        {
          user: user.email,
          product: item.product,
          price: item.price,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.data;
      setSuccess(json);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (item) => {
    try {
      const response = await axios.delete(`/order/${order._id}/${item._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.data;
      setSuccess(json);
      fetchCart();
    } catch (error) {
      setError(error.message);
    }
  };

  const checkout = async () => {
    try {
      const response = await axios.put(`/order/place/${order._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.data;
      setSuccess(json);
      window.location = "/shop";
    } catch (error) {
      setError(error.message);
    }
  };
  console.log(process.env.REACT_APP_STRIPE_KEY);

  return (
    <div>
      <Navbar />
      {error && <Error message={error} />}
      {success && <Success message={success} />}
      {order.totalPrice ? (
        <div className="container mt-5">
          <h2>Your Cart</h2>
          <ul className="list-group">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{item.product}</span>
                <div className="btn-group">
                  <button
                    hidden={item.quantity === 1}
                    className="btn"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="m-2">{item.quantity}</span>
                  <button className="btn" onClick={() => handleIncrement(item)}>
                    +
                  </button>
                  <img
                    onClick={() => handleDelete(item)}
                    src="/delete.svg"
                    alt=""
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <strong>Total:</strong> ₹{order.totalPrice}
          </div>
          <Stripe
            token={checkout}
            stripeKey="pk_test_51ONYMRSDE8rC4k6ZWV1YOtKZz0UWgQ1XLrpD2vd5QRPIji4Q0z189Vo6gBXSTmS9GtnLkBISNROqaFCCGA4HjBfM00MlxfaaZx"
          />
        </div>
      ) : (
        <p>Your Cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
