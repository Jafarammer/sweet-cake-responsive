import Link from "next/link";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faSquarePlus,
  faComment,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
// css
import styles from "../styles/Home.module.css";

export default function MainLayout(props) {
  return (
    <div>
      <div>{props.children}</div>
      {/* <nav className="navbar navbar-dark bg-warning navbar-expand d-md-none d-lg-none d-xl-none fixed-bottom"> */}
      <nav
        className={`navbar navbar-dark bg-warning navbar-expand fixed-bottom`}
      >
        <ul className="navbar-nav nav-justified w-100 p-0 m-0">
          {/* Home */}
          <li className="nav-item">
            <Link href="/" passHref>
              <a className="nav-link">
                <h1>
                  <i className="bi bi-house-fill"></i>
                </h1>
              </a>
            </Link>
          </li>
          {/* add recipe */}
          <li className="nav-item">
            <Link href="/addRecipe" passHref>
              <a className="nav-link">
                <h1>
                  <i className="bi bi-plus-square-fill"></i>
                </h1>
              </a>
            </Link>
          </li>
          {/* chat */}
          <li className="nav-item">
            <a href="#" className="nav-link">
              <h1>
                <i className="bi bi-chat-fill"></i>
              </h1>
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
              <span className="fs-1">
                <i className="bi bi-person-fill"></i>
              </span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start mb-3 me-2">
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
                <Link href="/profile" passHref>
                  <a className="dropdown-item">Profile</a>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
