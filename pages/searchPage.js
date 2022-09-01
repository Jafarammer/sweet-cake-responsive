import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
// css
import styles from "../styles/Home.module.css";

export default function searchPage() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const query = router.query;
  const title = query.title;

  useEffect(() => {
    axios.get("/api/recipe").then((res) => setData(res.data));
  }, []);

  let dataSearch = data.filter((item) => {
    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(title.toString().toLowerCase())
    );
  });

  return (
    <div className={styles.content}>
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
        </section>
      </main>
    </div>
  );
}
