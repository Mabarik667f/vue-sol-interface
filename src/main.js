import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import components from '@/components/UI/index';
import 'bootstrap/dist/css/bootstrap.css';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component);
})

app
    .use(bootstrap)
    .use(store)
    .use(router)
    .mount('#app')
