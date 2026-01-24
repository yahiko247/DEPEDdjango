import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/auth.css"

export default function AuthForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccesMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // initialize navigate
  const [isLogin, setIsLogin] = useState(true);

  // for login

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://192.168.1.106:8000/api/login/",
        formData,
      );
      console.log("Success!", response.data);
      setSuccesMessage("Login Successfull!");
      localStorage.setItem("accessToken", response.data.tokens.access);
      localStorage.setItem("refreshToken", response.data.tokens.refresh);
      navigate("/dashboard");
    } catch (error) {
      console.log("Error during Login!", error.response?.data);
      if (error.response && error.response.data) {
        Object.keys(error.response.data).forEach((field) => {
          const errorMessages = error.response.data[field];
          if (errorMessages && errorMessages.length > 0) {
            setError(errorMessages[0]);
          }
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // for register

  const [formData2, setFormData2] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleChange2 = (e) => {
    setFormData2({
      ...formData2,
      [e.target.name]: e.target.value,
    });
    console.log(formData2);
  };

  const [isLoading2, setIsLoading2] = useState(false);
  const [successMessage2, setSuccesMessage2] = useState(null);
  const [error2, setError2] = useState(null);

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    setIsLoading2(true);

    try {
      const response = await axios.post(
        "http://192.168.1.106:8000/api/register/",
        formData2,
      );
      console.log("Success!", response.data);
      setSuccesMessage2("Registration Successfull!");
    } catch (error) {
      console.log("Error during registration!", error.response?.data);
      if (error.response && error.response.data) {
        Object.keys(error.response.data).forEach((field) => {
          const errorMessages = error.response.data[field];
          if (errorMessages && errorMessages.length > 0) {
            setError(errorMessages[0]);
          }
        });
      }
    } finally {
      setIsLoading2(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            SignUp
          </button>
        </div>

        {isLogin ? (
          <>
            <div className="form">
              <h2>Login Form</h2>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              <a href="#" onClick={(e) => e.preventDefault()}>
                Forgot Password
              </a>
              <button type="submit" disabled={isLoading} onClick={handleSubmit}>
                Login
              </button>
              <p>
                Not a Member? <a href="">Sign now</a>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="form">
              <h2>Sign Up Form</h2>
              <input
                type="text"
                name="username"
                value={formData2.username}
                onChange={handleChange2}
                placeholder="username"
              />
              <input
                type="email"
                name="email"
                value={formData2.email}
                onChange={handleChange2}
                placeholder="Email"
              />
              <input
                type="password"
                name="password1"
                value={formData2.password1}
                onChange={handleChange2}
                placeholder="Password"
              />
              <input
                type="password"
                name="password2"
                value={formData2.password2}
                onChange={handleChange2}
                placeholder="Confirm Password"
              />
              <button
                type="submit"
                disabled={isLoading2}
                onClick={handleSubmit2}
              >
                Sign Up
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
