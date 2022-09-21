import Link from "next/link";
import styles from "../styles/Home.module.css";
// redux
import { useSelector } from "react-redux";

export default function Navbar() {
  const { token } = useSelector((state) => state?.auth);
  return (
    <div>
      <nav
        className={`navbar navbar-dark bg-warning navbar-expand fixed-bottom d-flex justify-content-center ${styles.d_nav}`}
      >
        <ul className="navbar-nav nav-justified w-100 p-0 m-0">
          {/* Home */}
          <li className="nav-item">
            <Link href="/" passHref>
              <a className="nav-link">
                <h3>
                  <i className="bi bi-house-fill"></i>
                </h3>
              </a>
            </Link>
          </li>
          {/* add recipe */}
          <li className="nav-item">
            {token ? (
              <Link href="/addRecipe" passHref>
                <a className="nav-link">
                  <h3>
                    <i className="bi bi-plus-square-fill"></i>
                  </h3>
                </a>
              </Link>
            ) : (
              <Link href="/auth/login" passHref>
                <a className="nav-link">
                  <h3>
                    <i className="bi bi-plus-square-fill"></i>
                  </h3>
                </a>
              </Link>
            )}
          </li>
          {/* chat */}
          <li className="nav-item">
            <a href="#" className="nav-link">
              <h3>
                <i className="bi bi-chat-fill"></i>
              </h3>
            </a>
          </li>
          {/* profile login register */}
          <li className="nav-item dropup">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-expanded="false"
            >
              <span className="fs-3">
                <i className="bi bi-person-fill"></i>
              </span>
            </a>
            <ul
              className={`dropdown-menu dropdown-menu-end dropdown-menu-lg-start mb-3 me-2 ${styles.d_dropdown}`}
            >
              <li>
                <Link href="/auth/login" passHref>
                  <a className="dropdown-item">Login</a>
                </Link>
              </li>
              <li>
                <Link href="/auth/register" passHref>
                  <a className="dropdown-item">Register</a>
                </Link>
              </li>
              <li>
                {token ? (
                  <Link href="/profile" passHref>
                    <a className="dropdown-item">Profile</a>
                  </Link>
                ) : (
                  <Link href="/auth/login" passHref>
                    <a className="dropdown-item">Profile</a>
                  </Link>
                )}
              </li>
              <li>
                <Link href="/auth/logout" passHref>
                  <a className="dropdown-item">Logout</a>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
