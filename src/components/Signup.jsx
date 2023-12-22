import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(
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
      setError(error.message);
      setPassword("");
      setConfirmPassword("");
      return;
    }
  };

  return (
    <div>
      <form className="px-2" onSubmit={handleSignup}>
        {/* <div className="card-title mb-4">Signup</div> */}
        <div className="form-control">
          {/* {error && <p className="text-red-500">{error}</p>} */}
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="confirm password"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mt-6 flex">
          <button type="submit" className="btn btn-primary inline">
            Signup
          </button>
        </div>
        <div className="divider font-bold text-slate-500">OR</div>
      </form>
    </div>
  );
};

export default Signup;
