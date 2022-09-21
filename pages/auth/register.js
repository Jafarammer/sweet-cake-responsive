import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
// redux
import { useSelector } from "react-redux";
// css
import styles from "../../styles/auth/register.module.css";

function register() {
  const { token } = useSelector((state) => state?.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      Router.push("/");
    }
  });

  const handleRegister = () => {
    setIsLoading(true);
    axios
      .post("https://sweet-cake-chef.herokuapp.com/register", {
        name,
        email,
        phone_number,
        password,
        confirmPassword,
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: "Register successfully ",
        });
        setTimeout(() => {
          Router.replace("/auth/login");
        }, 1200);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: `${error?.response.data}`,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
        <form className="mx-3 mt-5" onSubmit={(e) => e.preventDefault()}>
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
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPhoneNumber(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
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
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* button input */}
          <div className="d-grid gap-1 mt-4">
            <button
              className="btn btn-light text-warning py-2 fw-bold"
              onClick={handleRegister}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Register"}
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
