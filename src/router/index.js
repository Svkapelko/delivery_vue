import { createRouter, createWebHistory } from 'vue-router';
import Home from '../../Vues/Home.vue';
import Product from '../../Vues/Product.vue';
import Profile from '../../Vues/Profile.vue';

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
    },
    {
      path: "/profile",
      component: Profile
    }      
  ],
})

export default router
