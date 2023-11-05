// import Hero from "../src/Hero";
// import Form from "../src/Form";
import axios from "axios";
import Hero from "../src/Hero";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { useNavigate } from "react-router-dom";
import { BASE_URL_FE } from "../src/components/base";
// import "./Home.css";

export default function Home() {
  const [validd, setValidd] = useState(false);
  const color = "#646cff";
  const [loading, setLoading] = useState(false);
  // const [s1, setS1] = useState(0);
  // const [s2, setS2] = useState(0);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    setLoading(true);
    axios
      .post(`${BASE_URL_FE}/`)
      .then((res) => {
        if (res.data.valid) {
          setValidd(true);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        } else {
          navigate("/login");
        }
      })
      .catch((e) => console.log(e));
  }, [navigate]);

  return (
    <>
      {validd && (
        <div>
          {loading ? (
            <HashLoader
              color={color}
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <>
              <div>
                <Hero validd={validd} />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
