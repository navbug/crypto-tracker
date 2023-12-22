import React, { useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { FaGoogle } from "react-icons/fa";
import Signup from "./Signup";
import Login from "./Login";

const Auth = () => {
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

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
      return;
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary btn-outline btn-sm rounded-btn text-lg"
        onClick={() => {
          setOpen(true);
          document.getElementById("modal").showModal();
        }}
      >
        Login
      </button>

      {open && (
        <dialog id={`${open && "modal"}`} className="modal">
          <div className="modal-box card relative shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form method="dialog" className="absolute right-0 top-0">
              <button className="btn font-extrabold text-xl text-slate-500">
                X
              </button>
            </form>
            <div role="tablist" className="tabs tabs-lifted">
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab font-semibold text-[1rem]"
                aria-label="SignUp"
              />
              <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
              >
                <Signup />
                <SignInWithGoogle />
              </div>

              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab font-semibold text-[1rem]"
                aria-label="Login"
                checked
              />
              <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
              >
                <Login />
                <SignInWithGoogle />
              </div>
            </div>
            {/* <Signup /> */}
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Auth;

const SignInWithGoogle = () => {
  const signInWithGoogle = () => {
    const googleAuthProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleAuthProvider)
      .then((res) => {
        if (open) {
          console.log(res);
          document.getElementById("modal").close();
          setOpen(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-control mt-6">
      <button
        type="button"
        className="btn btn-primary"
        onClick={signInWithGoogle}
      >
        <FaGoogle />
        Sign In with Google
      </button>
    </div>
  );
};
