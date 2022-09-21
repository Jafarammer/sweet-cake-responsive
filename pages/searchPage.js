import React from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
// layout
import Navbar from "../layouts/Navbar";
// css
import styles from "../styles/Home.module.css";

export default function searchPage() {
  const [data, setData] = React.useState([]);
  const router = useRouter();
  const query = router.query.title;

  React.useEffect(() => {
    axios
      .get(
        `https://sweet-cake-chef.herokuapp.com/recipe/name?title_recipe=${query}`
      )
      .then((res) => setData(res.data.data));
  }, [query]);

  let dataSearch = data.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(query.toString().toLowerCase())
    );
  });

  return (
    <div className={styles.content}>
      <Navbar />
      {/* content */}
      <main className="container">
        <section className="py-3">
          <Link href="/" passHref>
            <a className="text-decoration-none text-warning fw-bold">Back</a>
          </Link>
          <div className="d-flex align-items-center flex-column px-3 mt-4">
            {dataSearch.map((item) => (
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
                      objectFit="cover"
                    />
                  </div>
                  <div className="col-8">
                    <div className="card-body">
                      <h5 className="card-title text-secondary">
                        {item?.title_recipe?.length > 15
                          ? item?.title_recipe?.substring(0, 15) + "..."
                          : item?.title_recipe}
                      </h5>
                      <small className="text-muted">
                        {item?.ingredients?.length > 15
                          ? item?.ingredients?.substring(0, 15) + "..."
                          : item?.ingredients}
                      </small>
                      <p
                        className={`card-text mt-3 ${styles.view_detail} `}
                        onClick={() => Router.push("/detailRecipe/" + item?.id)}
                      >
                        <i class="bi bi-eye-fill me-1 mt-1"></i>
                        View detail
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
