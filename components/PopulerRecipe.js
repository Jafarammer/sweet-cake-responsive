import React from "react";
import Image from "next/image";
import axios from "axios";
// css
import styles from "../styles/Home.module.css";

export default function PopulerRecipe() {
  const [dataPopuler, setDataPopuler] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("/api/recipe/getRecipe")
      .then((res) => setDataPopuler(res.data.data));
  });
  return (
    <div>
      <div className="d-flex align-items-center flex-column px-3">
        {dataPopuler.map((item) => (
          <div
            key={item?.id_recipe}
            className={`card shadow mx-3 mb-3 ${styles.card_img}`}
          >
            <div className="row g-0">
              <div className="col-4 py-2 ps-2">
                <Image
                  src={item?.photo}
                  alt="logo"
                  width="100%"
                  height="100%"
                />
              </div>
              <div className="col-8">
                <div className="card-body">
                  <h5 className="card-title text-secondary">
                    {item?.title_recipe}
                  </h5>
                  <small className="text-muted">Sweet, Gentle</small>
                  <p className="card-text text-warning mt-1">
                    <i className="bi bi-star-fill"></i>
                    <small className="text-muted ms-2">4.7</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
