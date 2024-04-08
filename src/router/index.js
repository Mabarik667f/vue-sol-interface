import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import TokensBuyView from '@/views/TokensBuyView.vue'
import InvestorRequestView from '@/views/InvestorRequestView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView
  },
  {
    path: '/buyTokens',
    name: 'buyTokens',
    component: TokensBuyView
  },
  {
    path: '/investorRequest',
    name: 'investorRequest',
    component: InvestorRequestView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
