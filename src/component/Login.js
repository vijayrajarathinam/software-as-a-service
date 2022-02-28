import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { auth } from "../firebase";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";

String.prototype.isEmpty = function () {
  return this.length === 0 || !this.trim();
};
function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({
    username: { error: false, message: [] },
    password: { error: false, message: [] },
  });

  const [form, setForm] = useState({
    button: "Sign In",
    buttonDisabled: false,
    error: "",
  });
  const navigate = useNavigate();

  function onLoginClick(e) {
    e.preventDefault();
    if (validate()) {
      setForm({ ...form, button: "Signing In...", buttonDisabled: true });
      const auth = getAuth();

      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          return signInWithEmailAndPassword(auth, user.username, user.password)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log(user);
              // ...

              navigate("/");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    } else {
      if (!user.username.isEmpty() && !user.password.isEmpty())
        setForm({ ...form, button: "Sign In", error: "Username or password is invalid" });
    }
  }

  function validate() {
    const info = error;
    let state = true;

    if (user.username.isEmpty()) {
      info.username = { error: true, message: ["Please choose a username."] };
      state = false;
    }

    if (user.password.isEmpty()) {
      info.password = { error: true, message: ["Please choose a password."] };
      state = false;
    }

    setError({ error, ...info });
    return state;
  }

  function onInputChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    if (!value.isEmpty()) setError({ ...error, [name]: { error: false, message: [] } });

    setUser({ ...user, [name]: value });
  }

  return (
    <div className="relative h-screen bg-gray-100">
      <div className="max-w-sm w-full shadow-sm  bg-white  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 rounded-lg p-4 h-auto">
        <div
          className="w-20 h-20 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-0.5 rounded-xl shadow-sm bg-white"
          style={{ border: "1px solid #efefef" }}
        >
          <img src="/coin.svg" />
        </div>
        <p className="text-2xl mt-7 text-center"> Melonin</p>
        {!form.error.isEmpty() && <p className="text-red-500 text-xs italic mt-3 text-center">{form.error}</p>}

        <form className="bg-white pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input
              className={`shadow appearance-none border ${
                error.username.error ? "border-red-500" : ""
              } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="username"
              type="text"
              placeholder="Username"
              value={user.username}
              name="username"
              onChange={onInputChange}
            />
            {error.username.error &&
              error.username.message.map((err) => <p className="text-red-500 text-xs italic">{err}</p>)}
          </div>
          <div className="my-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input
              className={`shadow appearance-none border ${
                error.password.error ? "border-red-500" : ""
              } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
              id="password"
              type="password"
              placeholder="******************"
              value={user.password}
              name="password"
              onChange={onInputChange}
            />
            {error.password.error &&
              error.password.message.map((err) => <p className="text-red-500 text-xs italic">{err}</p>)}
          </div>
          <div className="flex items-center justify-between">
            <button
              className={`${
                form.buttonDisabled
                  ? "bg-blue-400 hover:bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              type="button"
              onClick={onLoginClick}
              disabled={form.buttonDisabled}
            >
              {form.button}
            </button>

            <Link
              to="/register"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Not a member?
            </Link>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">&copy;2020 Acme Corp. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Login;
