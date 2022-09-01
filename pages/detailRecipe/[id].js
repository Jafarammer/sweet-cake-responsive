import Link from "next/link";
import Image from "next/image";
// react tabs
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
//css
import styles from "../../styles/details/detailRecipe.module.css";

export async function getStaticPaths() {
  const request = await fetch("http://localhost:8000/recipe").then((response) =>
    response.json()
  );

  return {
    paths: request.map((item) => ({
      params: { id: item?.id_recipe?.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const request = await fetch(`http://localhost:8000/recipe/${id}`).then(
    (response) => response.json()
  );

  return {
    props: {
      todo: request,
    },
  };
}

const DetailRecipe = (props) => {
  return (
    <div className={styles.content}>
      <Link href="/" passHref>
        <a
          className={`text-decoration-none fw-bold mt-3 ms-3 text-warning shadow px-2 ${styles.button_back}`}
        >
          <i className="bi bi-arrow-left-short"></i>
        </a>
      </Link>
      {/* title */}
      <h1 className={`ms-3 text-light ${styles.d_title}`}>
        {props?.todo[0]?.title_recipe}
      </h1>
      {/* subtitle */}
      <p className={`ms-3 shadow py-1 px-2 text-light ${styles.d_subTitle}`}>
        By Chef Ronald Humson
      </p>
      {/* button save like  */}
      <div className={`pe-3 ${styles.btn_save_like}`}>
        <button
          type="button"
          className={`btn btn-light text-warning shadow float-end mx-2`}
        >
          <i className="bi bi-hand-thumbs-up-fill"></i>
        </button>
        <button
          type="button"
          className={`btn btn-warning text-light float-end mx-2`}
        >
          <i className="bi bi-bookmark-fill"></i>
        </button>
      </div>

      {/* Header */}
      <header className={styles.d_header}>
        <div>
          <Image
            src={props?.todo[0]?.photo}
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
            <div className="mt-4 p-0">
              <Tabs>
                <TabList>
                  <Tab>Video Step</Tab>
                  <Tab>Ingredients</Tab>
                </TabList>

                {/* article video step */}
                <TabPanel>
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
                  <form className="px-3">
                    <textarea
                      className={`form-control mt-5 ${styles.input_comment}`}
                      id="exampleFormControlTextarea1"
                      rows="5"
                    ></textarea>
                    <div className="d-grid gap-1 mt-4">
                      <button
                        className="btn btn-warning text-white py-3 fw-bold"
                        type="button"
                      >
                        Comment
                      </button>
                    </div>
                  </form>
                  <p className="px-4 mt-4 text-muted">Comment :</p>

                  <div className={`card my-3 border-0 ${styles.card_comment}`}>
                    <div className={`row px-2 ${styles.row_tab}`}>
                      <div
                        className={`col-3 m-0 d-flex align-items-center justify-content-center`}
                      >
                        <Image
                          src="/images/default.jpg"
                          alt="logo"
                          width="40%"
                          height="40%"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="col-9 p-0">
                        <div className="card-body">
                          <small>Mantaps sekali resepnya</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Form comment */}
                </TabPanel>

                {/* article ingredients */}
                <TabPanel>
                  <h1>Halo Jafar</h1>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DetailRecipe;
