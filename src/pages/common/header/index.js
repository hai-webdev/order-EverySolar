// 头部的js代码
import "swiper/css/swiper.min.css";
import "./index.less";
import {WOW} from "wowjs";
import "wowjs/css/libs/animate.css";

const wow = new WOW({});
wow.init();

$(".menu .menu-btn").on("click", function(){
    $(".menu-container").addClass("on");
})
$(".menu-container .menu").on("click", function(){
    $(".menu-container").removeClass("on");
})

$(".menu .nav-btn").on("click", function(){
    $(".nav-list").slideDown();
})
$(".nav-list .close").on("click", function(){
    $(".nav-list").slideUp();
})

$(".pro-nav-show").on("click", function(){
    $(this).find(".icon").toggleClass("on");
    $(this).next().slideToggle();
})