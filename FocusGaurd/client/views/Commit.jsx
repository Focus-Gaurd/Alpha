// import Hero from "../src/Hero";
// import Form from "../src/Form";
import axios from "axios";
// import Hero from "../src/Hero";
import { useEffect, useState } from "react";
import "./Stopwatch.css";
// import HashLoader from "react-spinners/HashLoader";
// import { useNavigate } from "react-router-dom";
import { BASE_URL_FE } from "../src/components/base";
// import "./Home.css";

export default function Commit() {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);

  // const navigate = useNavigate();

  var timer;
  useEffect(() => {
    async function fetchData() {
      try {
        await axios.post(`${BASE_URL_FE}/commit`).then((res) => {
          if (res.data.valid) {
            timer = setInterval(() => {
              setSecond(second + 1);
              if (second === 59) {
                setMinute(minute + 1);
                setSecond(0);
                // if (minute === 59) {
                //   setHour(hour + 1);
                //   setMinute(0);
                // }
              }
            }, 1000);
            return () => clearInterval(timer);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  });

  return (
    <>
      <div className="containss">
        <div className="divssss">
          <div className="divsss">
            <h1>
              {hour}:{minute}:{second}
            </h1>
          </div>
        </div>
        {/* <button className="start" onClick={commitStart}> */}
        {/* Start
        </button> */}
      </div>
    </>
  );
}
