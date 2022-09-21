import React from "react";
import Router from "next/router";
// css
import styles from "../styles/Home.module.css";
// layout
import Navbar from "../layouts/Navbar";
// component
import PopulerForYou from "../components/PopulerForYou";
import NewRecipe from "../components/NewRecipe";
import PopulerRecipe from "../components/PopulerRecipe";

export default function Home() {
  const [search, setSearch] = React.useState({ title: "" });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (event) => {
    setIsLoading(true);
    event.preventDefault();
    setTimeout(() => {
      Router.push({ pathname: "searchPage", query: search });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className={styles.content}>
      {/* content */}
      <main className="container">
        <Navbar />
        {/* input search */}
        <form onSubmit={handleSubmit}>
          <div className="input-group mt-4">
            <input
              type="text"
              className="form-control py-2 ps-4 ms-2"
              placeholder="Search Pasta, Bread, etc"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              value={search.title}
              onChange={(event) => setSearch({ title: event.target.value })}
              // onChange={(e) => setKeyword(e.target.value)}
            />
            {/* <Link href={{ pathname: "/searchPage", query: search }}> */}
            <button
              className="btn btn-warning text-white px-4 me-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && (
                <span className="spinner-border spinner-border-sm me-2" />
              )}
              {isLoading ? "Loading..." : <i className="bi bi-search"></i>}
            </button>
            {/* </Link> */}
          </div>
        </form>
        {/* End input search */}

        {/* Populer for you */}
        <section>
          <h3 className="mt-4 mx-3">Populer For You</h3>
          <PopulerForYou />
        </section>
        {/* End Populer for you */}

        {/* New recipe */}
        <section>
          <h3 className="m-3">New Recipe</h3>
          <NewRecipe />
        </section>
        {/* End New recipe */}

        {/* Populer recipe */}
        <section>
          <h3 className="mb-3 mt-5 mx-3">Populer recipe</h3>
          <PopulerRecipe />
        </section>
        {/* End Populer recipe */}
      </main>
      {/* End Content */}
    </div>
  );
}
