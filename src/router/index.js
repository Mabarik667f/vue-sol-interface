import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store/index";
import HomeView from '../views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import TokensBuyView from '@/views/TokensBuyView.vue'
import InvestorRequestView from '@/views/InvestorRequestView.vue'
import InvestorRequestsListView from '@/views/InvestorRequestsListView.vue';

const authGuard = (to, from, next) => {
  if(!store.state.auth.isAuth) {
    next('/');
  } else {
    next();
  }
}

const isPersonal = (to, from, next) => {
  const allowedRoles = ['admin', 'privateProvider'];
  if(!store.state.auth.isAuth || !allowedRoles.includes(store.state.auth.role)) {
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
  },
  {
    path: '/requestsList',
    name: 'requestList',
    component: InvestorRequestsListView,
    beforeEnter: isPersonal
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  store.dispatch('loadAuthData').then(() => {
    next();
  });

})
export default router
