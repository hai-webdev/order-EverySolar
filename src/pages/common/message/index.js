import "../reset.css";
import "@/assets/global.less";

// 引入页面公共部分的js

// 引入公共css

import "./index.less";
import { WOW } from "wowjs";
import "wowjs/css/libs/animate.css";

const wow = new WOW({});
wow.init();
$(".message-close").on("click", function(){
    console.log("关闭");
    $(".message-container").removeClass("show");
})
$(".message-show").on("click", function(){
    $(".message-container").addClass("show");
})