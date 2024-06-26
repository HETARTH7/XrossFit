import React, { useState } from "react";
import { useAuthContext } from "../utils/useAuthContext";
import Error from "../components/Error";
import Success from "../components/Success";
import axios from "../api/axios";

const Product = ({ data, onClose }) => {
  const { user } = useAuthContext();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [reviewForm, setReviewForm] = useState({
    user: user.name,
    content: "",
    rating: 0,
  });

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    const rating = name === "rating" ? parseInt(value, 10) : value;
    setReviewForm({
      ...reviewForm,
      [name]: rating,
    });
  };

  const handleSubmitReview = async (id) => {
    try {
      const response = await axios.put(`/product/${id}`, reviewForm, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.data;
      setSuccess(json);
      setReviewForm({
        user: "",
        content: "",
        rating: 0,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const addToCart = async () => {
    try {
      const response = await axios.post(
        "/order",
        {
          user: user.email,
          product: data.name,
          price: data.price,
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

  return (
    <div className="container mt-5">
      {error && <Error message={error} />}
      {success && <Success message={success} />}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <button
                type="button"
                className="btn-close float-end"
                aria-label="Close"
                onClick={() => onClose()}
              ></button>
              <h5 className="card-title">{data.name}</h5>
              <p className="card-text">
                {data.description || "No description available"}
              </p>
              <button
                onClick={addToCart}
                style={{ background: "#96f2d7" }}
                className="btn rounded mb-3"
              >
                Add to Cart
              </button>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Price:</strong> ₹{data.price}
                </li>
                <li className="list-group-item">
                  <strong>Stock Availability:</strong> {data.stockAvailability}
                </li>
                <li className="list-group-item">
                  <strong>Category:</strong> {data.category}
                </li>
                <li className="list-group-item">
                  <strong>Average User Rating:</strong>{" "}
                  {data.averageUserRating.toPrecision(3) || "Not rated"}
                </li>
                {data.reviews.length > 0 && (
                  <li className="list-group-item">
                    <strong>Reviews:</strong>
                    <ul>
                      {data.reviews.map((review, index) => (
                        <li key={index}>
                          <strong>User:</strong> {review.user},{" "}
                          <strong>Rating:</strong> {review.rating}
                          <p>{review.content}</p>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
              </ul>
              <form onSubmit={() => handleSubmitReview(data._id)}>
                <div className="mb-3">
                  <label htmlFor="user" className="form-label">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="user"
                    name="user"
                    value={reviewForm.user}
                    onChange={handleReviewChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    Review Content:
                  </label>
                  <textarea
                    className="form-control"
                    id="content"
                    name="content"
                    value={reviewForm.content}
                    onChange={handleReviewChange}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="rating" className="form-label">
                    Rating (1-5):
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="rating"
                    name="rating"
                    value={reviewForm.rating}
                    onChange={handleReviewChange}
                    min="1"
                    max="5"
                    required
                  />
                </div>
                <button
                  type="submit"
                  style={{ background: "#96f2d7" }}
                  className="btn rounded"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
