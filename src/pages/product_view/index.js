import "../common/reset.css";
import "@/assets/global.less";

// 引入页面公共部分的js
import "../common/header";
import "../common/message";
// 引入公共css

import "./index.less";
import axios from "axios";
import { WOW } from "wowjs";
import "wowjs/css/libs/animate.css";

const wow = new WOW({});
wow.init();

import { CountUp } from "countup.js";
const vm = new Vue({
  el: "#app",
  data: {
    startFormPrice: 0,
    ranel: {
      title: "",
      price: 0,
      isCont: false,
    },
    inverter: {
      title: "",
      price: 0,
      isCont: false,
    },
    totalPrice: 0,
    accList: [],
    accVal: [],
    accTitle: [],
    select01List: [],
    select02List: [],
    pics: [],
    picsIndex: 0,
    size: null,
  },
  async created() {
    this.renderSelectData(this.select01List, window.select01Tmp);
    this.renderSelectData(this.select02List, window.select02Tmp);
    this.$set(this.ranel, "title", this.select01List[0].name);
    this.$set(this.ranel, "price", this.select01List[0].price);
    this.$set(this.ranel, "isCont", true);
    this.$set(this.inverter, "title", this.select02List[0].name);
    this.$set(this.inverter, "price", this.select02List[0].price);
    this.$set(this.inverter, "isCont", true);
    this.pics = await this.getImg();
    this.size = await this.getSize();
  },
  async mounted() {
    this.startFormPrice = Number(this.$refs.startFormPrice.value);
    var countUp = new CountUp("price-num", this.$refs.startFormPrice.value, {
      startVal: 0,
      duration: 1,
      decimalPlaces: 2,
    });
    countUp.start();
    this.accList = await this.getRslist(window.accessories);
  },
  methods: {
    getAccTitle(title) {
      const isInclude = this.accTitle.indexOf(title);
      if (isInclude === -1) {
        this.accTitle.push(title);
      } else {
        this.accTitle.splice(isInclude, 1);
      }
    },
    // bannerSwiper(){
    //   var that = this;
    //   console.log(that.pics);
    //   return new Swiper(".pro-swiper", {
    //     loop: true,
    //     navigation: {
    //       nextEl: ".swiper-button-next",
    //       prevEl: ".swiper-button-prev",
    //     },
    //     speed: 600,
    //     virtual: {
    //       slides: that.pics,
    //       renderSlide:function(slide, index){
    //         return `<div class="swiper-slide" style="background-image:url(${window.webSite + slide})"></div>`;
    //       },
    //     },
    //   });
    // },
    async selectClick(data, dom) {
      this.picsIndex = 0;
      this.selectToggle(dom);
      if (dom.id === "select01") {
        this.ranel.title = data[0];
        this.ranel.price = data[1];
        this.ranel.isCont = true;
      } else if (dom.id === "select02") {
        this.inverter.title = data[0];
        this.inverter.price = data[1];
        this.inverter.isCont = true;
      }
      const prevPrice = this.totalPrice ? this.totalPrice : this.startFormPrice;
      const accValTotal =
        this.accVal.length &&
        this.accVal.reduce((a, b) => {
          return a + b;
        });
      this.totalPrice =
        this.startFormPrice +
        this.ranel.price +
        this.inverter.price +
        accValTotal;
      var countUp = new CountUp("price-num", this.totalPrice, {
        startVal: prevPrice,
        duration: 1,
        decimalPlaces: 2,
      });
      countUp.start();
      this.pics = await this.getImg();
      this.size = await this.getSize();
    },
    selectToggle(dom) {
      $(dom).next(".select-list").slideToggle();
      $(dom).find("span").eq(1).toggleClass("on");
    },
    messageShow(data) {
      $(".message-container").addClass("show");
      $("#message-ps span").text(data);
    },
    renderSelectData(arr, data) {
      const result = data.map((item) => {
        const delataItem = item.split("】")[0];
        const arrItem = delataItem.split("【");
        return {
          name: arrItem[0],
          price: Number(arrItem[1]),
        };
      });
      arr.push(...result);
    },
    async getRslist(id) {
      const data = await axios.post(
        `${window.webSite}/api.php/list/${id}/num/10000`
      );
      const rslist = data.data.data;
      return rslist.map((item) => {
        return {
          title: item.title,
          // select01: item.ext_p11,
          select01: item[select01Sort],
          // select02: item.ext_p12,
          select02: item[select02Sort],
          ico: item.ico,
          pics: item.pics,
          id: "rs" + item.id,
          price: Number(item.ext_price),
          size: item.subtitle,
        };
      });
    },
    async getImg() {
      const rslist = await this.getRslist(window.cateId);
      const filterList = rslist.filter((item) => {
        return (
          item.select01 === `${this.ranel.title}【${this.ranel.price}】` &&
          item.select02 === `${this.inverter.title}【${this.inverter.price}】`
        );
      });
      if (filterList.length === 1) {
        const pics = filterList[0].pics.split(",");
        return pics;
      } else if (filterList.length < 1) {
        return false;
      } else {
        console.log(filterList);
        console.log("请检查后台数据是否有重复");
        alert("请联系管理员检查后台数据是否有重复！");
      }
    },
    async getSize() {
      const rslist = await this.getRslist(window.cateId);
      const filterList = rslist.filter((item) => {
        return (
          item.select01 === `${this.ranel.title}【${this.ranel.price}】` &&
          item.select02 === `${this.inverter.title}【${this.inverter.price}】`
        );
      });
      if (filterList.length === 1) {
        const size = filterList[0].size;
        return size;
      } else if (filterList.length < 1) {
        return false;
      } else {
        console.log(filterList);
        console.log("请检查后台数据是否有重复");
        alert("请联系管理员检查后台数据是否有重复！");
      }
    },
    changIndex(type) {
      if (type === "+") {
        this.picsIndex++;
        if (this.picsIndex >= this.pics.length) {
          this.picsIndex = 0;
        }
      } else if (type === "-") {
        if (this.picsIndex <= 0) {
          this.picsIndex = this.pics.length;
        }
        this.picsIndex--;
      }
    },
  },
  watch: {
    accVal(old, news) {
      const prevPrice = this.totalPrice ? this.totalPrice : this.startFormPrice;
      const accValTotal =
        this.accVal.length &&
        this.accVal.reduce((a, b) => {
          return a + b;
        });
      this.totalPrice =
        this.startFormPrice +
        this.ranel.price +
        this.inverter.price +
        accValTotal;
      var countUp = new CountUp("price-num", this.totalPrice, {
        startVal: prevPrice,
        duration: 1,
        decimalPlaces: 2,
      });
      countUp.start();
    },
  },
});
$(".message-close").on("click", function(){
  console.log("关闭");
  $(".message-container").removeClass("show");
})
$(".message-show").on("click", function(){
  $(".message-container").addClass("show");
})