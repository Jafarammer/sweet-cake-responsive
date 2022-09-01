import React, { useEffect, useContext } from "react";
import Image from "next/image";
import Router from "next/router";
// component
import { ProfileContext } from "../../components/context";
// layout
import MainLayout from "../../layouts/MainLayout";
// css
import styles from "../../styles/profile.module.css";

function profile() {
  // is not login redirect to page login
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Router.push("/auth/login");
    }
  });

  const userConsumer = useContext(ProfileContext);

  return (
    <div className={styles.content}>
      {/* <NavBottom /> */}

      {/* content */}
      <main className="container p-0">
        <MainLayout>
          <header
            className={`d-flex align-items-center justify-content-center flex-column bg-warning ${styles.d_header}`}
          >
            <Image
              src={"/images/default.jpg"}
              alt="default image"
              width="100%"
              height="100%"
              className="rounded-circle"
            />
            <p className="mt-4 fw-bold text-white">{userConsumer?.name}</p>
          </header>
          <div className={`card border-0 shadow ${styles.d_card}`}>
            <ol className="list-group list-group mt-3">
              {/* list edit profile */}
              <li className="list-group-item py-3 d-flex justify-content-between align-items-start border-0">
                <h3 className="text-warning">
                  <i className="bi bi-person-fill"></i>
                </h3>
                <div className="ms-4 me-auto">
                  <small>Edit Profile</small>
                </div>
                <h6 className="text-muted me-2 py-1">
                  <i className="bi bi-caret-right-fill"></i>
                </h6>
              </li>

              {/* list my recipe */}
              <li className="list-group-item py-3 d-flex justify-content-between align-items-start border-0">
                <h3 className="text-warning">
                  <i className="bi bi-folder-fill"></i>
                </h3>
                <div className="ms-4 me-auto">
                  <small>My Recipe</small>
                </div>
                <h6 className="text-muted me-2 py-1">
                  <i className="bi bi-caret-right-fill"></i>
                </h6>
              </li>

              {/* list saved recipe */}
              <li className="list-group-item py-3 d-flex justify-content-between align-items-start border-0">
                <h3 className="text-warning">
                  <i className="bi bi-bookmark-fill"></i>
                </h3>
                <div className="ms-4 me-auto">
                  <small>Saved Recipe</small>
                </div>
                <h6 className="text-muted me-2 py-1">
                  <i className="bi bi-caret-right-fill"></i>
                </h6>
              </li>

              {/* list liked recipe */}
              <li className="list-group-item py-3 d-flex justify-content-between align-items-start border-0">
                <h3 className="text-warning">
                  <i className="bi bi-hand-thumbs-up-fill"></i>
                </h3>
                <div className="ms-4 me-auto">
                  <small>Liked Recipe</small>
                </div>
                <h6 className="text-muted me-2 py-1">
                  <i className="bi bi-caret-right-fill"></i>
                </h6>
              </li>
            </ol>
          </div>
        </MainLayout>
      </main>
    </div>
  );
}

export default profile;
