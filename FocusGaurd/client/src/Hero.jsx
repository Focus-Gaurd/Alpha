import Logo from "./assets/logo.png";
import "./Hero.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BASE_URL_FE } from "./components/base";
import rewards from "../src/assets/rewards.png";
import stopwatch from "../src/assets/stopwatch.png";
import report from "../src/assets/report.png";
// import { TonConnectButton } from "@tonconnect/ui-react";
// import { useEffect, useState } from "react";

export default function Hero({ validd }) {
  const history = useNavigate();
  axios.defaults.withCredentials = true;
  //   useEffect(() => {
  //     axios
  //       .post(`${BASE_URL_FE}/v2/nfts/collections`)
  //       .then((res) => {

  //         } else {

  //         }
  //       })
  //       .catch((e) => console.log(e));
  //   });
  const navigate = useNavigate();
  // axios.defaults.withCredentials = true;
  const OpenStopwatch = () => {
    axios
      .post(`${BASE_URL_FE}/stopwatch`)
      .then((res) => {
        if (res.data.valid) {
          navigate("/stopwatch");
        }
      })
      .catch((e) => console.log(e));
  };

  async function handleLogout(e) {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL_FE}/logout`).then((res) => {
        if (res.data == "logedOut") {
          history("/login");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className=" flex flex-row justify-between items-center">
        <Link href="https://e-cell.in/" target="_blank" rel="noreferrer">
          <img src={Logo} alt="E-Cell logo" className="w-[80px] h-[60px]" />
        </Link>

        <Link href={validd ? "" : "/login"}>
          {validd ? (
            <form action="/logout" method="post">
              {/* <button type="submit" onClick={handleLogout}>
                Logout
              </button> */}
              <div
                tabIndex="0"
                className="signInButton"
                type="submit"
                onClick={handleLogout}
              >
                <p className="signInButtonText">Logout</p>
              </div>
            </form>
          ) : (
            <button>Login</button>
          )}
        </Link>
      </div>
      <div className="divss">
        <div className="divs">
          <p onClick={OpenStopwatch}>
            <img
              src={stopwatch}
              alt="E-Cell logo"
              className="w-[80px] h-[60px]"
            />
          </p>
        </div>
        <div className="divs">
          <p >
            <img src={report} alt="E-Cell logo" className="w-[80px] h-[60px]" />
          </p>
        </div>
        <div className="divs">
          <p>
            <img
              src={rewards}
              alt="E-Cell logo"
              className="w-[80px] h-[60px]"
            />
          </p>
        </div>
        <div></div>
      </div>
    </>
  );
}
