import "../common/reset.css";
import "@/assets/global.less";

// 引入页面公共部分的js
import "../common/header";
import "../common/footer";
// 引入公共css

import "./index.less";
import Swiper from "swiper";
import {WOW} from "wowjs";
import "wowjs/css/libs/animate.css";

const wow = new WOW({});
wow.init();

const mySwiper = new Swiper(".pic-swiper", {
  loop: true,
  navigation:{
    nextEl:".swiper-button-next",
    prevEl:".swiper-button-prev",
  },
  pagination:{
    el:".swiper-pagination",
    clickable:true
  },
  autoplay: {
    delay: 3000,
  },
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
  },
});
