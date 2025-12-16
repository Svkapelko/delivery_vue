import { createRouter, createWebHistory } from 'vue-router';
import Home from '../../Vues/Home.vue';
import Product from '../../Vues/Product.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/rest",
      component: Product,
    }    
  ],
})

export default router
