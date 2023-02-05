import "../common/reset.css";
import "@/assets/global.less";

// 引入页面公共部分的js
import "../common/header";
// 引入公共css

import "./index.less";
import Swiper from "swiper";
import fullpage from "fullpage.js";

new fullpage("#fullpage", {
  //options here
  autoScrolling: true,
  scrollHorizontally: true,
  onLeave() {
    $(".btn-text").hide();
    $(".btn-text").find(".text").text("");
  },
});

const mySwiper = new Swiper(".pic-swiper", {
  loop: true,
  // navigation:{
  //   nextEl:".pic-swiper-button-next",
  //   prevEl:".pic-swiper-button-prev",
  // },
  // pagination:{
  //   el:".pic-swiper-pagination",
  //   clickable:true
  // },
  autoplay: {
    delay: 3000,
  },
  slidesPerView: 4,
  spaceBetween: 10,

  breakpoints: {
    640: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
    1440: {
      slidesPerView: 5,
      spaceBetween: 10,
    },
  },
});

$(".text-show").on("click", function () {
  var text = $(this).data("text");
  $(".btn-text").find(".text").text(text);
  $(".btn-text").show();
});

$(".text-close").on("click", function () {
  $(".btn-text").hide();
  $(".btn-text").find(".text").text("");
});
