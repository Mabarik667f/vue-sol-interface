import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store/index";
import HomeView from '../views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import TokensBuyView from '@/views/TokensBuyView.vue'
import InvestorRequestView from '@/views/InvestorRequestView.vue'

const authGuard = (to, from, next) => {
  if(!store.state.auth.isAuth) {
    next('/');
  } else {
    next();
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    beforeEnter: authGuard
  },
  {
    path: '/buyTokens',
    name: 'buyTokens',
    component: TokensBuyView,
    beforeEnter: authGuard
  },
  {
    path: '/investorRequest',
    name: 'investorRequest',
    component: InvestorRequestView,
    beforeEnter: authGuard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
