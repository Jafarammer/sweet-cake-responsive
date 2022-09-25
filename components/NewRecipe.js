import React from "react";
import Image from "next/image";
import Router from "next/router";
import Link from "next/link";
import axios from "axios";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
// css
import styles from "../styles/Home.module.css";

export default function NewRecipe() {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    axios.get("/api/recipe/getRecipe").then((res) => setData(res.data.data));
  });
  return (
    <div>
      <div className="d-flex justify-content-center mx-3">
        <Swiper
          freeMode={true}
          grabCursor={true}
          modules={[FreeMode]}
          className="mySwiper"
          slidesPerView={2}
          // spaceBetween={30}
        >
          {data.slice(0, 5).map((item) => (
            <SwiperSlide key={item?.id}>
              {/* <Link href={"/detailRecipe/" + item?.id}> */}
              <div
                className={`card ${styles.caraousel}`}
                onClick={() => Router.push(`/recipe/${item?.id}`)}
              >
                <Image
                  src={item?.photo}
                  alt="logo"
                  width="100%"
                  height="160%"
                />
              </div>
              {/* </Link> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <p
        className={`d-flex justify-content-end me-4 mt-4 ${styles.text_showMore}`}
        onClick={() => Router.push("/Sort")}
      >
        Show more
      </p>
    </div>
  );
}
