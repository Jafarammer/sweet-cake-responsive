import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
// icon
import "bootstrap-icons/font/bootstrap-icons.css";
import "swiper/css/bundle";
import { useEffect } from "react";
import axios from "axios";
// redux
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

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
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
