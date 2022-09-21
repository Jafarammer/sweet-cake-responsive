import React from "react";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
// redux
import { connect } from "react-redux";
import { authLogin } from "../../redux/reducer/authReducer";
// css
import styles from "../../styles/auth/login.module.css";

function login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    if (props.auth.token) {
      Router.replace("/");
    }
  }, [props.auth]);
  const handleLogin = (value) => {
    props.authRequestLogin({
      email: value?.email ?? email,
      password: value?.password ?? password,
    });
  };

  return (
    <div className={styles.content}>
      <div className="mt-3 ms-3">
        <Link href="/" passHref>
          <a className="text-decoration-none text-warning fw-bold">Back</a>
        </Link>
      </div>
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <small className="text-muted fw-bold float-end me-2">
            Forgot Password ?
          </small>
          <br />
          <div className="d-grid gap-1 mt-4">
            <button
              className="btn btn-light text-warning py-2 fw-bold"
              onClick={handleLogin}
              type="submit"
              disabled={props.auth?.loading}
            >
              {props.auth?.loading ? "Loading..." : "Login"}
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  setProfile: (data) => dispatch({ type: "SET_PROFILE", data: data }),
  authRequestLogin: (data) => dispatch(authLogin(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(login);
