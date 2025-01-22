import React from "react";
import styles from "./Slides.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { BASE_URL } from "../../../services/apiService";

const Slides = ({ itens }) => {
  return (
    <div className={styles.container}>
      <Swiper
        slidesPerView={1}
        loop={itens.length > 1}
        grabCursor={true}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {itens &&
          itens.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={styles.slide_item}>
                <img src={BASE_URL + item.img} alt="Imagem do item" />
                <h2>{item.nome}</h2>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slides;
