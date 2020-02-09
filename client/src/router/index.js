import Vue from 'vue';
import VueRouter from 'vue-router';
import Signup from '../components/Signup.vue';
import Login from '../components/Signup.vue';
import Profile from '../components/Signup.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Signup',
    /*
     * route level code-splitting
     * this generates a separate chunk (about.[hash].js) for this route
     * which is lazy-loaded when the route is visited.
     */
    component: () => Signup
  },
  {
    path: '/login',
    name: 'Login',
    /*
     * route level code-splitting
     * this generates a separate chunk (about.[hash].js) for this route
     * which is lazy-loaded when the route is visited.
     */
    component: () => Login
  },
  {
    path: '/profile',
    name: 'Profile',
    /*
     * route level code-splitting
     * this generates a separate chunk (about.[hash].js) for this route
     * which is lazy-loaded when the route is visited.
     */
    component: () => Profile
  }
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
});

export default router;
