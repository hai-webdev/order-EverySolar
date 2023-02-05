import "../common/reset.css";
import "@/assets/global.less";

// 引入页面公共部分的js
import "../common/header";
import "../common/footer";
// 引入公共css

import "./index.less";
import Swiper from "swiper";
import { WOW } from "wowjs";
import "wowjs/css/libs/animate.css";

const wow = new WOW({});
wow.init();

// const mapX = $("#map").data("x");
// const mapY = $("#map").data("y");

// function initialize() {
//   var mapProp = {
//     center: new google.maps.LatLng(mapX, mapY),
//     zoom: 15,
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };
//   var map = new google.maps.Map(document.getElementById("map"), mapProp);
// }

// google.maps.event.addDomListener(window, 'load', initialize);
