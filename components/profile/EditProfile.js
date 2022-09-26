import React from "react";
import Router from "next/router";
import Image from "next/image";
import Swal from "sweetalert2";
import axios from "axios";
// redux
import { useSelector } from "react-redux";
// css
import styles from "../../styles/profile.module.css";

function EditProfile() {
  const { profile } = useSelector((state) => state?.auth);
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState("");
  const [name, setName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const userUpdate = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("name", name);
    await axios
      .patch(
        `${process.env.API_URL}/users/edit/${profile?.id}`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        },
        []
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: "Update photo profile successfully",
        });
        setTimeout(() => {
          Router.reload(window.location.pathname);
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
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
    <div>
      <main>
        <form
          className={`mt-2 px-4 ${styles.d_form}`}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="form-control mb-4"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="form-control mb-4"
            type="file"
            onChange={loadImage}
          />
          <div className="py-5 px-3">
            <h2 className="text-center text-muted">Show Image</h2>
            <hr className="mb-5" />
            {preview ? (
              <div className="d-flex justify-content-center">
                <Image
                  src={preview}
                  alt="default image"
                  width="200px"
                  height="200px"
                  objectFit="cover"
                  className="rounded-circle"
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="d-grid gap-1 mt-4">
            <button
              className="btn btn-light text-warning py-2 fw-bold"
              onClick={userUpdate}
              type="submit"
              disabled={isLoading}
            >
              {isLoading && (
                <span className="spinner-border spinner-border-sm me-2" />
              )}
              {isLoading ? "Loading..." : "Update photo profile"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default EditProfile;
