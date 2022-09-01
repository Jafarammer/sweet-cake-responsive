import React, { useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
// Layouts
import MainLayout from "../layouts/MainLayout";
// css
import styles from "../styles/addRecipe.module.css";

export default function addRecipe() {
  // is not login redirect to page login
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Router.push("/auth/login");
    }
  });
  return (
    <div className={styles.content}>
      <MainLayout>
        {/* content */}
        <main className="container">
          <form className="mx-3 mt-5">
            <input className="form-control form-control-lg mb-4" type="file" />
            <input
              className="form-control mb-4 py-3"
              type="text"
              placeholder="Title"
            />
            <textarea
              className="form-control mt-5"
              placeholder="Ingredients"
              rows="5"
            ></textarea>
            <div className="d-grid gap-1 mt-4">
              <button
                className="btn btn-warning text-white py-3 fw-bold"
                type="button"
              >
                Post
              </button>
            </div>
          </form>
        </main>
      </MainLayout>
    </div>
  );
}
