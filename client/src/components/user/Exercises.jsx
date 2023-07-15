import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const Exercises = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [parts, setParts] = useState([]);
  const [part, setPart] = useState("");
  const [exercise, setExercise] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setParts(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [API_KEY]);

  const getExercises = () => {
    const options = {
      method: "GET",
      url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${part}`,
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setExercise(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div>
      <Navbar />
      <div>
        <div className="input-group mt-5">
          <select
            style={{ marginLeft: "38rem", marginRight: "2rem", width: "18rem" }}
            className="rounded-pill"
            onChange={(e) => setPart(e.target.value)}
          >
            <option defaultValue={true}>Choose Muscle</option>
            {parts.map((x, index) => {
              return <option key={index}>{x}</option>;
            })}
          </select>
          <button
            className="btn btn-primary rounded-pill"
            onClick={getExercises}
          >
            Search
          </button>
        </div>

        {exercise.map((x, index) => {
          return (
            <div
              key={index}
              style={{ width: "18rem", display: "inline-block" }}
              className="card-deck"
            >
              <div
                className="card"
                style={{ margin: "1rem", height: "auto", textAlign: "center" }}
              >
                <h3 className="card-title">{x.name}</h3>
                <img style={{ height: "auto" }} src={x.gifUrl} alt=""></img>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Exercises;
