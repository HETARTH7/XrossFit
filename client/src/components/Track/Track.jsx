import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Track.css";
import { useAuthContext } from "../../hooks/useAuthContext";

const ExerciseLogForm = () => {
  const { user } = useAuthContext();
  const [exerciseLog, setExerciseLog] = useState({
    exerciseName: "",
    duration: null,
    sets: null,
    repetitions: null,
    caloricBurn: null,
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExerciseLog((prevExerciseLog) => ({
      ...prevExerciseLog,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/log", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user.email, exerciseLog }),
    });

    const json = await response.json();

    if (response.ok) {
      console.log(json);
    }
    reset();
  };

  const reset = () => {
    setExerciseLog({
      exerciseName: "",
      duration: null,
      sets: null,
      repetitions: null,
      caloricBurn: null,
      notes: "",
    });
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit} className="container mt-4">
        <div className="mb-3 row">
          <label htmlFor="exerciseName" className="col-sm-2 col-form-label">
            Exercise Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="exerciseName"
              name="exerciseName"
              value={exerciseLog.exerciseName}
              onChange={handleChange}
              placeholder="Enter exercise name"
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="duration" className="col-sm-2 col-form-label">
            Duration (minutes)
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="duration"
              name="duration"
              value={exerciseLog.duration || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="sets" className="col-sm-2 col-form-label">
            Sets
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="sets"
              name="sets"
              value={exerciseLog.sets || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="repetitions" className="col-sm-2 col-form-label">
            Repetitions
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="repetitions"
              name="repetitions"
              value={exerciseLog.repetitions || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="caloricBurn" className="col-sm-2 col-form-label">
            Caloric Burn
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="caloricBurn"
              name="caloricBurn"
              value={exerciseLog.caloricBurn || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <label htmlFor="notes" className="col-sm-2 col-form-label">
            Notes
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              rows="3"
              id="notes"
              name="notes"
              value={exerciseLog.notes}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="d-grid">
          <button
            type="submit"
            style={{ background: "#96f2d7" }}
            className="btn rounded"
          >
            Add
          </button>
        </div>
        <div className="d-grid mt-2">
          <button onClick={reset} className="btn rounded">
            Reset
          </button>
        </div>
      </form>
      ;
    </div>
  );
};

export default ExerciseLogForm;
