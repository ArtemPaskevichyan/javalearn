import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";

axios.defaults.baseURL = "http://79.137.197.47:8089";

import "./assets/variables.css";

const app = createApp(App)

app.use(router)

app.mount('#app')
