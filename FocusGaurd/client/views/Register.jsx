import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { BASE_URL_FE } from "../src/components/base";

export default function Register() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  axios.defaults.withCredentials = true;
  async function submit(e) {
    e.preventDefault();
    try {
      await axios
        .post(`${BASE_URL_FE}/register`, {
          email,
          password,
        })
        .then((res) => {
          if (res.data.created === true) {
            history("/login");
            alert("sksksks");
          } else if (res.data.created === false) {
            alert("Already Exists");
          }
        })
        .catch((e) => {
          alert("Already Exists");
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="boduy">
        <div className="box ">
          <span className="borderLine"></span>
          <form
            className="Form1 flex flex-col  items-center"
            action="/register"
            method="post"
            autoComplete="off"
          >
            <h2>Sign up</h2>
            <div className="inputBox">
              <input
                type="text"
                name="username"
                id="username"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required="required"
              />
              <span>Email</span>
              <i></i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required="required"
              />
              <span>Password</span>
              <i></i>
            </div>
            <div className="sign">
              <input type="submit" value="Sign up" onClick={submit} />
              <button className="submit">
                <a href="http://localhost:5173/login">Sign in</a>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
