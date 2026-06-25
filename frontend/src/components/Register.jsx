import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await API.post("/auth/register", {
        name: user.name,
        email: user.email,
        password: user.password,
      });

      alert(response.data.message);

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>

      <form onSubmit={submitHandler}>
        <input
          placeholder="Name"
          onChange={(e) =>
            setUser({ ...user, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setUser({ ...user, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setUser({ ...user, password: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) =>
            setUser({
              ...user,
              confirmPassword: e.target.value,
            })
          }
        />

        <button type="submit">Register</button>
      </form>

      <Link to="/login">Already have an account?</Link>
    </div>
  );
}

export default Register;