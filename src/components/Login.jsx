import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);

      if (open) {
        document.getElementById("modal").close();
        setOpen(false);
      }
    } catch (error) {
      console.log(error.message);
      return;
    }
  };

  return (
    <div>
      <form className="px-4" onSubmit={handleSignup}>
        {/* <div className="card-title mb-4">Login</div> */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mt-6 flex">
          <button type="submit" className="btn btn-primary inline">
            Login
          </button>
        </div>
        <div className="divider font-bold text-slate-500">OR</div>
      </form>
    </div>
  );
};

export default Login;
