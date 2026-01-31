import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Background } from "../../assets";

export default function AuthForm() {
  //Login Form Data
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  //Register Form Data
  const [registerFormData, setRegisterFormData] = useState({
    first_name: "",
    last_name: "",
    middle_initial: "",
    subject: "",
    grade_level: "",
    email: "",
    password: "",
    re_password: "",
  });

  const [isLogin, setIsLogin] = useState(true);

  //Login Variables
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccesMessage] = useState(null);
  const [error, setError] = useState(null);

  //Register Variables
  const [isLoading2, setIsLoading2] = useState(false);
  const [successMessage2, setSuccesMessage2] = useState(null);
  const [error2, setError2] = useState(null);

  //Navigate and BASE_URL from env variables
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  //Validate Register Form Error
  const validateRegisterForm = () => {
    const {
      first_name,
      last_name,
      subject,
      grade_level,
      email,
      password,
      re_password,
    } = registerFormData;

    if (!first_name.trim()) return "Please enter your first name";
    if (!last_name.trim()) return "Please enter your last name";
    if (!subject.trim()) return "Please enter your subject";
    if (!grade_level.trim()) return "Please enter your grade level";
    if (!email.trim()) return "Please enter your email";
    if (!password) return "Please enter your password";
    if (!re_password) return "Please confirm your password";

    if (password !== re_password)
      return "Password and confirm password do not match";

    return null;
  };

  //Handle Login Change Function
  const handleLoginChange = (e) => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
    console.log(loginFormData);
  };

  //Handle Register Change Function
  const handleRegisterChange = (e) => {
    setRegisterFormData({
      ...registerFormData,
      [e.target.name]: e.target.value,
    });
    console.log(registerFormData);
  };

  //Handle Login Button Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/jwt/create/`,
        loginFormData,
      );

      console.log("Success!", response.data);
      console.log("Access:", response.data.access);
      setSuccesMessage("Login Successfull!");
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      toast.success("Login successful ", {
        onClose: () => navigate("/dashboard"),
      });
    } catch (error) {
      toast.error(" Invalid email or password");
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

  //Handle Register Button Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    const validationError = validateRegisterForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsLoading2(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/djoser/users/`,
        registerFormData,
      );
      toast.success("Successfully Registered ", {
        onClose: () => navigate("/dashboard"),
      });
      console.log("Success!", response.data);
      setSuccesMessage2("Registration Successfull!");
    } catch (error) {
      toast.error("Invalid email or password");
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
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Background})` }}
    >
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
            <div className="form overflow-y-auto max-h-[70vh]">
              <h2>Login Form</h2>
              <input
                type="email"
                name="email"
                value={loginFormData.email}
                onChange={handleLoginChange}
                placeholder="Email"
              />
              <input
                type="password"
                name="password"
                value={loginFormData.password}
                onChange={handleLoginChange}
                placeholder="Password"
              />
              <a href="#" onClick={(e) => e.preventDefault()}>
                Forgot Password
              </a>
              <button
                type="submit"
                disabled={isLoading}
                onClick={handleLoginSubmit}
              >
                Login
              </button>
              <p>
                Not a Member? <a href="">Sign now</a>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="form overflow-y-auto overflow-x-auto max-h-[70vh]">
              <h2>Sign Up Form</h2>

              <input
                type="text"
                name="first_name"
                value={registerFormData.first_name}
                onChange={handleRegisterChange}
                placeholder="First Name"
              />
              <input
                type="text"
                name="middle_initial"
                value={registerFormData.middle_initial}
                onChange={handleRegisterChange}
                placeholder="Middle Initial"
              />
              <input
                type="text"
                name="last_name"
                value={registerFormData.last_name}
                onChange={handleRegisterChange}
                placeholder="Last Name"
              />

              {/*REMINDER FOR DROPDOWN FOR SUBJECT*/}
              <input
                type="text"
                name="subject"
                value={registerFormData.subject}
                onChange={handleRegisterChange}
                placeholder="Subject"
              />
              {/*REMINDER FOR DROPDOWN FOR GRADE LEVEL*/}
              <input
                type="text"
                name="grade_level"
                value={registerFormData.grade_level}
                onChange={handleRegisterChange}
                placeholder="Grade Level"
              />

              <input
                type="email"
                name="email"
                value={registerFormData.email}
                onChange={handleRegisterChange}
                placeholder="Email"
              />

              <input
                type="password"
                name="password"
                value={registerFormData.password}
                onChange={handleRegisterChange}
                placeholder="Password"
              />

              <input
                type="password"
                name="confirm_password"
                value={registerFormData.re_password}
                onChange={handleRegisterChange}
                placeholder="Confirm Password"
              />

              <button
                type="submit"
                disabled={isLoading2}
                onClick={handleRegisterSubmit}
              >
                Sign Up
              </button>
            </div>
          </>
        )}{" "}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
