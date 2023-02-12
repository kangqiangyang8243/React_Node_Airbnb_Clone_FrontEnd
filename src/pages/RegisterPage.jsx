import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function RegisterPage() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_TOKEN)) {
      navigate("/");
    }
  }, []);

  const handleValidation = () => {
    if (username.length === 0 || password.length === 0) {
      toast.error("Please fill all fields");
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters.");
      return false;
    } else if (password.length < 6) {
      toast.error("Password should be equal or greater than 8 characters.");
      return false;
    } else if (email === "") {
      toast.error("Email is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const res = await axios.post(
        process.env.REACT_APP_BASE_URL + "/auth/register",
        {
          username,
          email,
          password,
        }
      );

      if (res.data.status === false) {
        toast.error(res.data.message);
      }

      if (res.data.status === true) {
        // console.log(res.data);
        localStorage.setItem(
          process.env.REACT_APP_TOKEN,
          JSON.stringify(res.data.user)
        );

        toast.success("User registered successfully.");
        navigate("/");
      }
    } else {
      toast.error("Some fields are not in required.");
    }
  };

  return (
    <div className="w-full h-screen bg-register bg-no-repeat bg-cover bg-center bg-fixed">
      <div className="max-w-7xl  mx-auto  h-full  flex items-center px-10 justify-center">
        <div className="shadow-2xl rounded-lg w-[500px]  flex flex-col items-center font-serif gap-5 p-5">
          <h2 className="text-3xl font-semibold text-gray-600 ">Register</h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 text-gray-600 w-full max-w-[350px]"
          >
            <div className="flex flex-col">
              <label className="font-semibold">UserName</label>
              <input
                type="text"
                autoFocus
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="p-2 rounded-lg outline-none focus:shadow-md transform duration-100 ease-linear"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Email</label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                className="p-2 rounded-lg outline-none focus:shadow-md transform duration-100 ease-linear"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">Password</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="p-2 rounded-lg outline-none focus:shadow-md transform duration-100 ease-linear"
              />
            </div>
            <button
              type="submit"
              className="uppercase mt-2 bg-pink-500 py-2 rounded-lg hover:bg-pink-400 active:bg-pink-500 text-slate-100 font-semibold shadow-sm"
            >
              Register
            </button>
          </form>

          <p className="uppercase whitespace-nowrap text-white">
            already have a account?{" "}
            <Link to="/login">
              <span className="text-pink-400 hover:underline underline-offset-4 cursor-pointer">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
