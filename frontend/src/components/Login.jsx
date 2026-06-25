import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post(
        "/auth/login",
        user
      );

      alert(response.data.message);

      localStorage.setItem(
        "email",
        user.email
      );

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>

      <form onSubmit={submitHandler}>
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
            setUser({
              ...user,
              password: e.target.value,
            })
          }
        />

        <button type="submit">
          Login
        </button>
      </form>

      <Link to="/register">
        Create Account
      </Link>
    </div>
  );
}

export default Login;