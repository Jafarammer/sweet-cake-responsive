import React from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
// layout
import Navbar from "../layouts/Navbar";
// component
import Pagination from "../components/Pagination";
// utils
import { paginate } from "../utils/paginate";
// css
import styles from "../styles/Home.module.css";

export default function SearchPage() {
  const [data, setData] = React.useState([]);
  const [isError, setIsError] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [posts, setPosts] = React.useState([]);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = React.useState(1);
  const router = useRouter();
  const query = router.query.title;

  React.useEffect(() => {
    axios
      .get(`${process.env.API_URL}/recipe/name?title_recipe=${query}`)
      .then((res) => setData(res.data.data))
      .catch((error) => {
        setIsError(true);
        setMessage(error.response.data);
      });
  }, [query]);

  // React.useEffect(() => {
  //   const getPosts = async () => {
  //     const { data: res } = await axios.get(
  //       `${process.env.API_URL}/recipe/name?title_recipe=${query}`
  //     );
  //     setPosts(res.data);
  //   };
  //   getPosts();
  // }, [query]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const paginatePosts = paginate(data, currentPage, pageSize);

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
          {isError ? (
            <div className={`mt-5 ${styles.d_notFound}`}>
              <h4 className="text-muted text-center">{message}</h4>
              <Image
                src={"/images/notFound2.svg"}
                width="500px"
                height="200px"
              />
            </div>
          ) : (
            <div className="d-flex align-items-center flex-column px-3 mt-4">
              {paginatePosts.map((post) => (
                <div
                  key={post?.id_recipe}
                  className={`card shadow mx-3 mb-3 ${styles.card_img}`}
                >
                  <div className="row g-0">
                    <div className="col-4 py-2 ps-2">
                      <Image
                        src={post?.photo}
                        alt="logo"
                        width="100%"
                        height="100%"
                        objectFit="cover"
                      />
                    </div>
                    <div className="col-8">
                      <div className="card-body">
                        <h5 className="card-title text-secondary">
                          {post?.title_recipe?.length > 15
                            ? post?.title_recipe?.substring(0, 15) + "..."
                            : post?.title_recipe}
                        </h5>
                        <small className="text-muted">
                          {post?.ingredients?.length > 15
                            ? post?.ingredients?.substring(0, 15) + "..."
                            : post?.ingredients}
                        </small>
                        <p
                          className={`card-text mt-3 ${styles.view_detail} `}
                          onClick={() =>
                            Router.push("/detailRecipe/" + post?.id)
                          }
                        >
                          <i className="bi bi-eye-fill me-1 mt-1"></i>
                          View detail
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Pagination
                items={data?.length}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
