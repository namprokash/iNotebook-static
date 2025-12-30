import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NoteContaxt from "../context/NoteContext";

function Signup() {
  const constaxt = useContext(NoteContaxt);
  const { showAlert } = constaxt;
  const navigate = useNavigate();
  const signup = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    const json = await res.json();
    if (json.success) {
      console.log("Successfull");
      navigate("/");
      localStorage.setItem("token", json.authToken);
      showAlert("Account created successfully!", "Success");
    } else {
      showAlert(json.msg, "Error");
    }
  };
  return (
    <div>
      <form onSubmit={signup}>
        <div className="mb-3">
          <label htmlFor="Name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            name="name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
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
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  );
}

export default Signup;
