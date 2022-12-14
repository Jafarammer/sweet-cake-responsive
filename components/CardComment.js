import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
// css
import styles from "../styles/details/detailRecipe.module.css";

function CardComment() {
  const router = useRouter();
  const { id } = router.query;
  const [dataComment, setDataComment] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`${process.env.API_URL}/comment/comment/${id}`)
      .then((res) => setDataComment(res.data.data));
  }, []);

  const addDefaultSrc = (e) => {
    e.target.src = "/images/default.jpg";
  };

  return (
    <div>
      {dataComment.map((item) => (
        <div key={item?.id} className="d-flex align-items-center mb-3 px-4">
          <div className="flex-shrink-0 rounded-circle border border-warning">
            <img
              src={item?.photo_profile || "/images/default.jpg"}
              onError={addDefaultSrc}
              alt="image"
              className={`${styles.img_comment} rounded-circle`}
              crossOrigin="anonymous"
            />
          </div>
          {/* <br /> */}
          <div className="flex-grow-1 ms-3">
            <p className="fw-bold text-decoration-underline lh-1">
              {item?.name}
            </p>
            <p className="lh-1">
              <small className={`text-muted lh-1 ${styles.text_comment}`}>
                {item?.comment_message}
              </small>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardComment;
