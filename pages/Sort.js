import React from "react";
import Link from "next/link";
// component
import Pagination from "../components/Pagination";
// layout
import Navbar from "../layouts/Navbar";
// utils
import { paginate } from "../utils/paginate";
// css
import styles from "../styles/Sort.module.css";

function Sort() {
  const [data, setData] = React.useState([]);
  const [sortType, setSortType] = React.useState("default");
  const pageSize = 3;
  const [currentPage, setCurrentPage] = React.useState(1);

  const sortedData = React.useMemo(() => {
    let result = data;

    if (sortType === "descending") {
      result = [...data].sort((a, b) => {
        return b.id.toString().localeCompare(a.id.toString());
        // return parseInt(b.id.localeCompare(a.id));
      });
    } else if (sortType === "ascending") {
      result = [...data].sort((a, b) => {
        return a.id.toString().localeCompare(b.id.toString());
        // return parseInt(a.id.localeCompare(b.id));
      });
    }
    return result;
  }, [data, sortType]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`${process.env.API_URL}/recipe/all`);
    const data = await response.json();
    setData(data.data);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatePosts = paginate(sortedData, currentPage, pageSize);

  return (
    <div className={styles.content}>
      <Navbar />
      <div className="px-4">
        <select
          className="form-select my-5"
          aria-label="Default select example"
          defaultValue="default"
          onChange={(e) => setSortType(e.target.value)}
        >
          <option disabled value="default">
            sort by
          </option>
          <option value="ascending">Longest</option>
          <option value="descending">Latest</option>
        </select>
      </div>

      <ul className="list-group">
        {paginatePosts.map((item) => {
          return (
            <li
              key={item?.id}
              className="list-group-item d-flex justify-content-center border-0"
            >
              <div className={`card ${styles.d_card}`}>
                <img src={item?.photo} className="card-img-top" alt="image" />
                <div className="card-body">
                  <h5 className="card-title">
                    {item?.title_recipe?.length > 15
                      ? item?.title_recipe?.substring(0, 15) + "..."
                      : item?.title_recipe}
                  </h5>
                  <p className="card-text">
                    {item?.ingredients?.length > 70
                      ? item?.ingredients?.substring(0, 70) + "..."
                      : item?.ingredients}
                  </p>
                </div>
                <div className="card-body">
                  <Link href={`/recipe/${item?.id}`} passHref>
                    <a className="card-link">View detail</a>
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
        <div className="d-flex justify-content-center mt-3">
          <Pagination
            items={sortedData?.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </ul>
    </div>
  );
}

export default Sort;
