import React from "react";

export default function Alert(props) {
  return (
    <div
      className="alert alert-danger alert-dismissible fade show mt-2 mx-2"
      role="alert"
    >
      <strong>User not found!</strong> Please chek your email and password.
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
}
