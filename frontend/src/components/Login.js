import { useState, useEffect } from "react";
import "../styles/Signup.css";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.email === "" || data.password === "") {
      toast.error("Enter valid data");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        data
      );

      if (response.data.existuser) {
        localStorage.setItem("email", data.email);
        toast.success(response.data.existuser);
        setTimeout(() => {
          navigate("/Home");
        }, 1000);
        return;
      }

      if (response.data.newuser) {
        localStorage.setItem("email", data.email);
        toast.success(response.data.newuser);
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
        return;
      }

      if (response.data.message) {
        toast.error(response.data.message);
        return;
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err)
      return;
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "monospace",
        }}
        className="container"
      >
        <div className="card" style={{ minWidth: "320px" }}>
          <div className="title">
            Welcome back,
            <br />
            <span>Log in to your account</span>
          </div>
          <div className="card-body" style={{ padding: "35px" }}>
            <div>
              <input
                className="form-control mb-4"
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
                placeholder="email"
                autoComplete="off"
              />
            </div>
            <div>
              <input
                className="form-control mb-4"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                required
                placeholder="password"
                autoComplete="off"
              />
            </div>
            <div className="w-100">
              <button className="btn btn-dark w-100" onClick={handleSubmit}>
                LOGIN
              </button>
              <p className="text-center mt-3 text-muted q_btn">
                No account? <a href="/">Signup</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
