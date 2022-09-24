import React from "react";
import Router from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
// redux
import { useSelector } from "react-redux";
// Layouts
import Navbar from "../layouts/Navbar";
// css
import styles from "../styles/addRecipe.module.css";

export default function AddRecipe() {
  const { profile } = useSelector((state) => state?.auth);
  const [title, setTitle] = React.useState("");
  const [ingredients, setIngredients] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveRecipe = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title_recipe", title);
    formData.append("ingredients", ingredients);
    formData.append("photo", file);
    formData.append("user_id", profile?.id);
    await axios
      .post(
        `${process.env.API_URL}/recipe/add`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        },
        []
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: "Add Recipe successfully",
        });
        setTimeout(() => {
          Router.replace("/");
        }, 2000);
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
      <Navbar />
      {/* content */}
      <main className="container">
        <form className="mx-3 mt-5" onSubmit={(e) => e.preventDefault()}>
          <input
            className="form-control form-control-lg mb-4"
            type="file"
            onChange={loadImage}
          />
          <input
            className="form-control mb-4 py-3"
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="form-control mt-5"
            placeholder="Ingredients"
            rows="5"
            onChange={(e) => setIngredients(e.target.value)}
          />
          <div className="py-5 px-3">
            <h2 className="text-center text-muted">Show Image</h2>
            <hr className="mb-5" />
            {preview ? (
              <div
                className={`border border-4 border-warning card ${styles.d_card_show}`}
              >
                <img src={preview} alt="Preview Image" />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="d-grid gap-1 mt-4">
            <button
              className="btn btn-warning text-white py-3 fw-bold"
              type="submit"
              onClick={saveRecipe}
              disabled={isLoading}
            >
              {isLoading && (
                <span className="spinner-border spinner-border-sm me-2" />
              )}
              {isLoading ? "Loading..." : "Post"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
