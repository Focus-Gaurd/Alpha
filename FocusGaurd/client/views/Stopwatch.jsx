// import Hero from "../src/Hero";
// import Form from "../src/Form";
import axios from "axios";
// import Hero from "../src/Hero";
import { useState } from "react";
import "./Stopwatch.css";
// import HashLoader from "react-spinners/HashLoader";
import { useNavigate } from "react-router-dom";
import { BASE_URL_FE } from "../src/components/base";
// import "./Home.css";

export default function Stopwatch() {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const navigate = useNavigate();
  const increments = () => {
    setSecond(second + 1);
  };
  const incrementm = () => {
    setMinute(minute + 1);
  };
  const incrementh = () => {
    setHour(hour + 1);
  };
  const decrements = () => {
    if (second < 1) {
      setSecond(0);
    } else {
      setSecond(second - 1);
    }
  };
  const decrementm = () => {
    if (minute < 1) {
      setMinute(0);
    } else {
      setMinute(minute - 1);
    }
  };
  const decrementh = () => {
    if (hour < 1) {
      setHour(0);
    } else {
      setHour(hour - 1);
    }
  };
  const reqSend = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${BASE_URL_FE}/reqsend`, {
          second,
          minute,
          hour,
        })
        .then((res) => {
          if (res.data.valid) {
            navigate("/commit");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="containss">
        <div className="divssss">
          <div className="divsss">
            <button onClick={incrementh}>+</button>
            <h1>{hour}</h1>
            <button onClick={decrementh}>-</button>
          </div>
          <div className="divsss">
            <button onClick={incrementm}>+</button>
            <h1>{minute}</h1>
            <button onClick={decrementm}>-</button>
          </div>
          <div className="divsss">
            <button onClick={increments}>+</button>
            <h1>{second}</h1>
            <button onClick={decrements}>-</button>
          </div>
        </div>
        <button className="start" onClick={reqSend}>
          Start
        </button>
      </div>
    </>
  );
}
