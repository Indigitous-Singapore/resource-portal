import { RouteConfig } from 'vue-router';

/**
 * Naming convention
 * 
 * index: List
 * Single
 * Edit
 * Create
 */

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/explore' },
      { path: 'about', name: 'about', component: () => import('pages/Pages/About.vue') },
      { path: 'privacy', name: 'privacy', component: () => import('pages/Pages/Privacy.vue') },
      { path: 'register', name:'register', component: () => import('pages/Authentication/Signup.vue') },
      { path: 'forgot-password', name: 'forgot-password', component: () => import('pages/Authentication/ForgotPassword.vue') },
      { path: 'login', name: 'login', component: () => import('pages/Authentication/Login.vue') },
      { path: 'logout', name: 'logout', component: () => import('pages/Authentication/Logout.vue') },
    ]
  },
  {
    path: '/explore',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { path: '/explore', name:'explore', meta: {private: true}, component: () => import('pages/Dashboard/Home.vue') }
    ]
  },
  {
    path: '/profile',
    component: () => import('../layouts/DashboardLayout.vue'),
    children: [
      { path: '', name: 'profile', component: () => import('../pages/Dashboard/Profile.vue') },
      { path: ':section', component: () => import('../pages/Dashboard/Profile.vue') }
    ]
  },
  {
    path: '/items',
    component: () => import('../layouts/DashboardLayout.vue'),
    children: [
      { path: '', redirect: { name: 'explore' }},
      { path: ':itemId', name: 'item', component: () => import('../pages/Dashboard/Item.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    name: 'error404',
    path: '*',
    component: () => import('../pages/Error404.vue')
  }
];

export default routes;
