import "./assets/main.css";
import "vue-toastification/dist/index.css";
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import Toast from "vue-toastification";
import { createPinia } from "pinia";
import { addIcons, OhVueIcon } from "oh-vue-icons";
import { IoTrashOutline, CoPen } from "oh-vue-icons/icons";

const app = createApp(App);

app.use(router);
app.use(Toast);
app.use(createPinia());
addIcons(IoTrashOutline, CoPen);
app.component("v-icon", OhVueIcon);
app.mount("#app");
