import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(Toast);

app.mount("#app");
