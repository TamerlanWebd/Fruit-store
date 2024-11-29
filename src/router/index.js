import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import ProductDetail from '@/views/ProductDetail.vue';
import CheckoutPage from '@/views/Checkout.vue';
import OrdersPage from '@/views/OrdersPage.vue';
const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/checkout', name: 'checkout', component: CheckoutPage },
  { path: '/orders', name: 'orders', component: OrdersPage },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetail },
  {path: "/cart",
  name: "cart",
  component: () => import("../views/CartView.vue"),
  
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;