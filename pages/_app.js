import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
// icon
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect } from "react";
import axios from "axios";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle");
  }, []);

  axios.interceptors.request.use(
    function (config) {
      if (localStorage.getItem("token")) {
        config.headers = {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        };
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return <Component {...pageProps} />;
}

export default MyApp;
