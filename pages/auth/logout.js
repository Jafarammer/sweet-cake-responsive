import Router from "next/router";
import { useEffect } from "react";
// redux
import { connect } from "react-redux";
import { authLogin } from "../../redux/reducer/authReducer";
// css
import styles from "../../styles/auth/logout.module.css";

function logout(props) {
  useEffect(() => {
    setTimeout(() => {
      props.setLogout();
      Router.replace("/auth/login");
    }, 2000);
  });
  return (
    <div
      className={`d-flex align-items-center justify-content-center ${styles.d_loading}`}
    >
      <div className="spinner-grow text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => ({
  setLogout: () => dispatch({ type: "SET_LOGOUT" }),
  authRequestLogin: (data) => dispatch(authLogin(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(logout);
