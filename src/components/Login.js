import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteContaxt from "../context/NoteContext";

function Login() {
  const constaxt = useContext(NoteContaxt);
  const { showAlert } = constaxt;
  const navigate = useNavigate();
  const loginHandler = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });

    const json = await res.json();
    if (json.success) {
      showAlert("Logged in successfully!", "Success");
      console.log("Successfull");
      navigate("/");
      localStorage.setItem("token", json.authToken);
    } else {
      showAlert(json.msg, "Error");
    }
  };
  return (
    <div>
      <form onSubmit={loginHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            required
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
