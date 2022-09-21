import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
// css
import styles from "../styles/Home.module.css";

export default function NewRecipe() {
  const [data, setData] = useState([]);
  useEffect(() => {
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
          {data.map((item) => (
            <SwiperSlide key={item?.id}>
              <Link href={"/detailRecipe/" + item?.id}>
                <div className={`card ${styles.caraousel}`}>
                  <Image
                    src={item?.photo}
                    alt="logo"
                    width="100%"
                    height="160%"
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
