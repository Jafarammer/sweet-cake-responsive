import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";
// css
import styles from "../../styles/auth/login.module.css";

function login() {
  const [email, setEmail] = useState("");
  const [password, seTPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = () => {
    setIsLoading(true);
    axios
      .post("http://localhost:8000/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setIsError(false);
        // Set Token
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("user", JSON.stringify(res?.data?.user));
        Router.push("/");
      })
      .catch((err) => {
        setIsError(true);
        setErrMsg(err?.response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // cek localstorage
  useEffect(() => {
    if (localStorage.getItem("token")) {
      Router.push("/");
    }
  });

  return (
    <div className={styles.content}>
      <div className="mt-3 ms-3">
        <Link href="/" passHref>
          <a className="text-decoration-none text-warning fw-bold">Back</a>
        </Link>
      </div>
      {/* message */}
      {isError ? (
        <div
          className="alert alert-danger alert-dismissible fade show mt-2 mx-2"
          role="alert"
        >
          <strong>{errMsg}</strong>{" "}
          <small>Please chek your email and password!!!</small>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      ) : null}

      {/* end message */}
      <div
        className={`d-flex align-items-center justify-content-center ${styles.d_img}`}
      >
        <Image
          src={"/images/default.jpg"}
          alt="default image"
          width="150%"
          height="150%"
          className="rounded-circle"
        />
      </div>

      {/* content */}
      <main className="container">
        <h3 className="text-center text-warning mt-2">Welcome</h3>
        <p className="text-center text-muted mb-5">
          Log in to your exiting account.
        </p>
        {/* Form */}
        <form className="mx-3" onSubmit={(e) => e.preventDefault()}>
          {/* input email */}
          <div className="input-group mb-4">
            <span className="input-group-text" id="basic-addon1">
              <h3 className="text-warning">
                <i className="bi bi-person"></i>
              </h3>
            </span>
            <input
              type="email"
              className="form-control py-3"
              placeholder="examplexxx@gmail.com"
              aria-label="Email"
              aria-describedby="basic-addon1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* input password */}
          <div className="input-group mb-2">
            <span className="input-group-text" id="basic-addon2">
              <h3 className="text-warning">
                <i className="bi bi-lock"></i>
              </h3>
            </span>
            <input
              type="password"
              className="form-control py-3"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon2"
              onChange={(e) => seTPassword(e.target.value)}
            />
          </div>
          <small className="text-muted fw-bold float-end me-2">
            Forgot Password ?
          </small>
          <br />
          <div className="d-grid gap-1 mt-4">
            <button
              className="btn btn-warning text-white py-3 fw-bold"
              type="submit"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>

          <p className="text-center mt-5">
            Don&apos;t have an account ?{" "}
            <Link href="/auth/register" passHref>
              <a className="text-decoration-none text-warning fw-bold">
                Sign Up
              </a>
            </Link>
          </p>
        </form>
        {/* End Form */}
      </main>
    </div>
  );
}

export default login;
