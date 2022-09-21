import React from "react";
import Image from "next/image";
import Router from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
// redux
import { useSelector } from "react-redux";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
// css
import styles from "../../styles/profile.module.css";

function MyRecipe() {
  const { profile } = useSelector((state) => state?.auth);
  const [dataRecipe, setDataRecipe] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(
        `https://sweet-cake-chef.herokuapp.com/recipe/recipebyuser/${profile?.id}`
      )
      .then((res) => setDataRecipe(res.data.recipe));
  });

  return (
    <div>
      <Swiper
        freeMode={true}
        grabCursor={true}
        modules={[FreeMode]}
        className="mySwiper"
        slidesPerView={2}
        // spaceBetween={30}
      >
        {dataRecipe.map((item) => (
          <SwiperSlide key={item?.id}>
            <div className={`card bg-dark ${styles.caraousel}`}>
              <Image
                src={item?.photo}
                alt="logo"
                width="130px"
                height="160px"
                objectFit="cover"
              />
              <i
                className="bi bi-trash-fill position-absolute ms-3 mt-2 fs-4"
                onClick={() =>
                  axios
                    .delete(
                      `https://sweet-cake-chef.herokuapp.com/recipe/delete/${item?.id}`
                    )
                    .then((res) => {
                      Swal.fire({
                        icon: "success",
                        text: `Delete ${item?.title_recipe} successfully`,
                      });
                      setTimeout(() => {
                        Router.reload(window.location.pathname);
                      }, 1000);
                    })
                    .catch((error) => {
                      Swal.fire({
                        icon: "error",
                        text: `${error?.response.data}`,
                      });
                    })
                }
              />
              <p className="position-absolute fixed-bottom text-center text-light">
                {item?.title_recipe?.length > 12
                  ? item?.title_recipe?.substring(0, 12) + "..."
                  : item?.title_recipe}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MyRecipe;
