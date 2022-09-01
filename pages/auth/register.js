import React from "react";
import Link from "next/link";
// css
import styles from "../../styles/auth/register.module.css";

function register() {
  return (
    <div className={styles.content}>
      <div className="mt-3 ms-3">
        <Link href="/" passHref>
          <a className="text-decoration-none text-warning fw-bold">Back</a>
        </Link>
      </div>
      <h3 className="mt-4 text-center text-warning">
        Let&apos;s Get Started !
      </h3>
      <h6 className="mt-3 text-center text-muted">
        Create new account to access all feautures
      </h6>

      {/* Content */}
      <main className="container">
        <form className="mx-3 mt-5">
          {/* input name */}
          <div className="input-group mb-4">
            <span className="input-group-text" id="basic-addon1">
              <h3 className="text-warning mt-2">
                <i className="bi bi-person"></i>
              </h3>
            </span>
            <input
              type="text"
              className="form-control py-3"
              placeholder="Name"
              aria-label="Name"
              aria-describedby="basic-addon1"
            />
          </div>

          {/* input email */}
          <div className="input-group mb-4">
            <span className="input-group-text" id="basic-addon2">
              <h3 className="text-warning mt-2">
                <i className="bi bi-envelope"></i>
              </h3>
            </span>
            <input
              type="email"
              className="form-control py-3"
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon2"
            />
          </div>

          {/* input phone number */}
          <div className="input-group mb-4">
            <span className="input-group-text" id="basic-addon3">
              <h3 className="text-warning mt-2">
                <i className="bi bi-telephone"></i>
              </h3>
            </span>
            <input
              type="number"
              className="form-control py-3"
              placeholder="Phone Number"
              aria-label="Phone Number"
              aria-describedby="basic-addon3"
            />
          </div>

          {/* input new password */}
          <div className="input-group mb-4">
            <span className="input-group-text" id="basic-addon4">
              <h3 className="text-warning mt-2">
                <i className="bi bi-lock"></i>
              </h3>
            </span>
            <input
              type="password"
              className="form-control py-3"
              placeholder="Create New Password"
              aria-label="New Password"
              aria-describedby="basic-addon4"
            />
          </div>

          {/* input confirm password */}
          <div className="input-group mb-4">
            <span className="input-group-text" id="basic-addon5">
              <h3 className="text-warning mt-2">
                <i className="bi bi-unlock"></i>
              </h3>
            </span>
            <input
              type="password"
              className="form-control py-3"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              aria-describedby="basic-addon5"
            />
          </div>

          {/* button input */}
          <div className="d-grid gap-1 mt-5">
            <button
              className="btn btn-warning text-white py-3 fw-bold"
              type="button"
            >
              Register
            </button>
          </div>

          <p className="text-center mt-5">
            Already have account ?{" "}
            <Link href="/auth/login" passHref>
              <a className="text-decoration-none text-warning fw-bold">
                Log in Here
              </a>
            </Link>
          </p>
        </form>
      </main>
      {/* End Content */}
    </div>
  );
}

export default register;
