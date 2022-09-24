import React from "react";
import Image from "next/image";
import axios from "axios";
// redux
import { useSelector } from "react-redux";
// component
import EditProfile from "../../components/profile/EditProfile";
import MyRecipe from "../../components/profile/MyRecipe";
import SaveRecipe from "../../components/profile/SaveRecipe";
import LikeRecipe from "../../components/profile/LikeRecipe";
// layout
import Navbar from "../../layouts/Navbar";
// css
import styles from "../../styles/profile.module.css";

function Profile() {
  const { profile } = useSelector((state) => state?.auth);
  const [dataProfile, setDataProfile] = React.useState("");
  React.useEffect(() => {
    axios
      .get(`${process.env.API_URL}/users/id/${profile?.id}`)
      .then((res) => setDataProfile(res.data.data));
  }, []);

  const addDefaultSrc = (e) => {
    e.target.src = "/images/default.jpg";
  };
  return (
    <div className={styles.content}>
      {/* <NavBottom /> */}
      <Navbar />
      {/* content */}
      <main className="container p-0">
        <header
          className={`d-flex align-items-center justify-content-center flex-column bg-warning ${styles.d_header}`}
        >
          <Image
            src={dataProfile[0]?.photo || "/images/default.jpg"}
            alt="default image"
            width="100%"
            height="100%"
            className="rounded-circle"
            objectFit="cover"
            onError={addDefaultSrc}
          />
          <p className="mt-4 fw-bold text-white">{dataProfile[0]?.name}</p>
        </header>
        <div className={`card border-0 ${styles.d_card}`}>
          {/* list edit profile */}
          <div className="accordion mt-3" id="accordionExample1">
            <div className="accordion-item border-0">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className={`accordion-button collapsed ${styles.btn_accordion}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  <i className="bi bi-person-fill text-warning me-3 fs-4"></i>{" "}
                  Edit Profile
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample1"
              >
                <div className="accordion-body">
                  <EditProfile />
                </div>
              </div>
            </div>
          </div>

          {/* list my recipe */}
          <div className="accordion" id="accordionExample2">
            <div className="accordion-item border-0">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className={`accordion-button collapsed ${styles.btn_accordion}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <i className="bi bi-folder-fill text-warning me-3 fs-4"></i>{" "}
                  My Recipe
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample2"
              >
                <div className="accordion-body">
                  <MyRecipe />
                </div>
              </div>
            </div>
          </div>

          {/* list saved recipe */}
          <div className="accordion" id="accordionExample3">
            <div className="accordion-item border-0">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className={`accordion-button collapsed ${styles.btn_accordion}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <i className="bi bi-bookmark-fill text-warning me-3 fs-4"></i>{" "}
                  Save Recipe
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample3"
              >
                <div className="accordion-body">
                  <SaveRecipe />
                </div>
              </div>
            </div>
          </div>

          {/* list liked recipe */}
          <div className="accordion" id="accordionExample4">
            <div className="accordion-item border-0">
              <h2 className="accordion-header" id="headingFour">
                <button
                  className={`accordion-button collapsed ${styles.btn_accordion}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  <i className="bi bi-hand-thumbs-up-fill text-warning me-3 fs-4"></i>{" "}
                  Like Recipe
                </button>
              </h2>
              <div
                id="collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionExample4"
              >
                <div className="accordion-body">
                  <LikeRecipe />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
