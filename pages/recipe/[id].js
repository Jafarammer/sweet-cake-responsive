import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Router from "next/router";
import Swal from "sweetalert2";
import axios from "axios";
// redux
import { useSelector } from "react-redux";
// layout
import Navbar from "../../layouts/Navbar";
// component
import CardComment from "../../components/CardComment";
// css
import styles from "../../styles/details/detailRecipe.module.css";

export default function Detail() {
  const router = useRouter();
  const { id } = router.query;
  const { profile } = useSelector((state) => state?.auth);
  const { token } = useSelector((state) => state?.auth);
  const [dataRecipe, setDataRecipe] = React.useState([]);
  const [comment_message, setCommentMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [toggleState, setToggleState] = React.useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  React.useEffect(() => {
    axios
      .get(`${process.env.API_URL}/recipe/id/${id}`)
      .then((res) => setDataRecipe(res.data.data));
  }, []);

  const handleComment = async () => {
    setIsLoading(true);
    if (!token) {
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          text: "You are not logged in",
        });
        Router.replace("/auth/login");
      }, 2000);
    } else {
      await axios
        .post(
          `${process.env.API_URL}/comment/add`,
          {
            comment_message,
            user_id: profile?.id,
            recipe_id: props?.todo?.data[0]?.id,
          },
          []
        )
        .then((res) => {
          Swal.fire({
            icon: "success",
            text: res.data.message,
          });
          setTimeout(() => {
            Router.reload(window.location.pathname);
          }, 700);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            text: `${error?.response.data}`,
          });
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className={styles.content}>
      <Navbar />
      {/* title */}
      <h3 className={`ms-3 text-light ${styles.d_title}`}>
        {dataRecipe[0]?.title_recipe}
      </h3>
      {/* subtitle */}
      <p className={`ms-3 shadow-lg py-1 px-2 text-light ${styles.d_subTitle}`}>
        Chef by {dataRecipe[0]?.name}
      </p>
      {/* Header */}
      <header className={styles.d_header}>
        <div className="card m-0 p-0 bg-dark">
          <Image
            src={dataRecipe[0]?.photo}
            alt="default image"
            width="700px"
            height="700px"
          />
        </div>
      </header>

      {/* content */}
      <main className="container p-0">
        <section>
          <div className={`card border-0 ${styles.d_card}`}>
            <div className="mt-4">
              <ul className="nav nav-pills nav-fill border border-2 border-bottom border-top-0 border-start-0 border-end-0">
                <li className="nav-item">
                  <button
                    className={
                      toggleState === 1
                        ? "nav-link text-warning fw-bold"
                        : "nav-link text-muted fw-bold"
                    }
                    onClick={() => toggleTab(1)}
                  >
                    Video Step
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={
                      toggleState === 2
                        ? "nav-link text-warning fw-bold"
                        : "nav-link text-muted fw-bold"
                    }
                    onClick={() => toggleTab(2)}
                  >
                    Ingredients
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* result content */}
          <div className={`container mt-3`}>
            {/* conten video step */}
            <div className={toggleState === 1 ? "d-block" : "d-none"}>
              <div className="px-3 mt-4">
                <div className={`card mb-3 border-0 ${styles.card_img}`}>
                  <div className={`row mx-1 p-2 ${styles.row_tab}`}>
                    <div
                      className={`col-4 bg-warning d-flex align-items-center justify-content-center ${styles.col_left_tab}`}
                    >
                      <Image
                        src="/images/Vector.png"
                        alt="logo"
                        width="30%"
                        height="30%"
                      />
                    </div>
                    <div className="col-8 p-0">
                      <div className="card-body">
                        <h5 className="card-title text-muted">Step 1</h5>
                        <small>Boil eggs for 3 minutes</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Form comment */}
              <form className="px-3" onSubmit={(e) => e.preventDefault()}>
                <textarea
                  className={`form-control mt-5 ${styles.input_comment}`}
                  id="exampleFormControlTextarea1"
                  rows="5"
                  onChange={(e) => setCommentMessage(e.target.value)}
                />
                <div className="d-grid gap-1 mt-4">
                  <button
                    className="btn btn-light text-warning py-2 fw-bold"
                    onClick={handleComment}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <span className="spinner-border spinner-border-sm me-2" />
                    )}
                    {isLoading ? "Loading..." : "Comment"}
                  </button>
                </div>
              </form>
              <p className="px-4 mt-4 text-muted">Comment :</p>

              <CardComment />
            </div>

            {/* content ingerdients */}
            <div className={toggleState === 2 ? "d-block" : "d-none"}>
              <div className={`px-4 ${styles.d_ingredients}`}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: dataRecipe[0]?.ingredients
                      ?.split("\n")
                      .join("<br />"),
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
