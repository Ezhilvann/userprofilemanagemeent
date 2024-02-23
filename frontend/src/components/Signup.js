import { useState } from "react";
import "../styles/Signup.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    e.preventDefault();

    if (data.email === "" || data.password === "" || confirmPassword === "") {
      toast.error("Enter all data");
      return;
    }
    if (!emailRegex.test(data.email)) {
      toast.error("Enter a valid email");
      return;
    }
    if (confirmPassword.length < 8) {
      toast("Password should have more than 8 characters", {
        duration: 2000,
      });
      return;
    }
    if (confirmPassword !== data.password) {
      toast.error("Password mismatch");
      return;
    }
    await axios
      .post(`${process.env.REACT_APP_API_URL}/register`, data)
      .then((response) => {
        if (response.data.error) {
          toast.error(response.data.error);
          return;
        }
        if (response.data.message) {
          toast.success("Registed successfully");
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      });
  };

  return (
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
      <Toaster position="top-center" reverseOrder={true} />
      <div className="card" style={{ minWidth: "320px" }}>
        <div className="title">
          Welcome,
          <br />
          <span>sign up to continue</span>
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
              placeholder="Email"
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
              placeholder="Password"
              autoComplete="off"
            />
          </div>
          <div>
            <input
              className="form-control mb-4"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              placeholder="Confirm Password"
              autoComplete="off"
            />
          </div>
          <div className="w-100">
            <button className="btn btn-dark w-100" onClick={handleSubmit}>
              SIGN UP
            </button>
            <p className="text-center mt-3 text-muted q_btn">
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
