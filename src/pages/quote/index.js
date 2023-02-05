import "../common/reset.css";
import "@/assets/global.less";

// 引入页面公共部分的js
import "../common/header";
import "../common/footer";
// 引入公共css

import "./index.less";
import {WOW} from "wowjs";
import "wowjs/css/libs/animate.css";

const wow = new WOW({});
wow.init();

