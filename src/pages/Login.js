import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../scss/login.css";
import data from "../utils/lendsqr_data.json";

const Login = ({ setTotalPosts }) => {
  const [hide, setHide] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("lendsqr_data")) {
      navigate("/");
    }
  }, [navigate]);

  const handleInputs = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!email || !password) {
      toast.error("All fields must be filled");
    } else if (password.length < 3) {
      toast.error("Password length must be greater than 3");
    } else {
      localStorage.setItem("lendsqr_data", JSON.stringify(data));
      setTotalPosts(data);
      navigate("/");
    }
  };

  return (
    <main>
      <ToastContainer />
      <div className="left-login-container">
        <header>
          <Link to="/" className="img">
            <img src="/svgs/lendsqr_logo.svg" alt="" />
          </Link>
        </header>
        <div className="left-section">
          <img src="/images/pablo-sign-in 1.png" alt="pablo-sign-in" />
        </div>
      </div>
      <div className="right-login-container">
        <header>
          <Link to="/" className="img">
            <img src="/svgs/lendsqr_logo.svg" alt="" />
          </Link>
        </header>
        <div className="space">s</div>
        <div className="right-section">
          <h3>Welcome!</h3>
          <p>Enter details to login.</p>

          <form action="" onSubmit={handleSubmit}>
            <input
              type="email"
              className="email"
              placeholder="Email"
              name="email"
              onChange={handleInputs}
              value={email}
            />
            <div className="input-password">
              <input
                type={hide ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleInputs}
                value={password}
              />
              <span onClick={() => setHide(!hide)}>
                {hide ? "HIDE" : "SHOW"}
              </span>
            </div>
            <Link to="#">FORGOT PASSWORD?</Link>
            <button type="submit">LOG IN</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
