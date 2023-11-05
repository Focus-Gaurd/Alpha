import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { BASE_URL_FE } from "../src/components/base";

export default function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  axios.defaults.withCredentials = true;
  async function submit(e) {
    e.preventDefault();
    try {
      await axios
        .post(`${BASE_URL_FE}/login`, {
          email,
          password,
        })
        .then((res) => {
          if (res.data.exists == "exists") {
            history("/");
            alert("sksksks");
          } else if (res.data == "notExists") {
            alert("Wrong Username or Password");
          }
        })
        .catch((e) => {
          alert("wrong details");
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
            action="/login"
            method="post"
            autoComplete="off"
          >
            <h2>Sign in</h2>
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
              <input type="submit" value="Sign in" onClick={submit} />
              <button className="submit">
                <a href="http://localhost:5173/register">Sign up</a>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
