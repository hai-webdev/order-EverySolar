import "../common/reset.css";
import "@/assets/global.less";

// 引入页面公共部分的js
import "../common/header";
import "../common/footer";
// 引入公共css

import "./index.less";
import {WOW} from "wowjs";
import "wowjs/css/libs/animate.css";
import Swiper from "swiper";

const wow = new WOW({});
wow.init();

const processSwiper = new Swiper(".process-container.m",{
    loop: true,
    autoplay:{
        delay: 1000,
    },
    navigation:{
        prevEl:".swiper-button-prev",
        nextEl:".swiper-button-next",
    }
})

processSwiper.el.onmouseover = function(){
    processSwiper.autoplay.stop();
  }