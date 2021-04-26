"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = __importDefault(require("vue"));
const App_vue_1 = __importDefault(require("./App.vue"));
const store_1 = require("~/front/store");
const vue_notification_1 = __importDefault(require("vue-notification"));
vue_1.default.config.productionTip = false;
vue_1.default.use(vue_notification_1.default);
new vue_1.default({
    store: store_1.store,
    render: h => h(App_vue_1.default)
}).$mount('#app');
