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
      { path: 'about', name: 'about', component: () => import('pages/Pages/index.vue') },
      { path: 'privacy', name: 'privacy', component: () => import('pages/Pages/index.vue') },
    ]
  },
  {
    path: '/explore',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { path: '', name:'explore', meta: {private: true}, component: () => import('pages/Dashboard/Home.vue') }
    ]
  },
  {
    path: '/profile',
    component: () => import('../layouts/DashboardLayout.vue'),
    children: [
      { path: '', name: 'profile', component: () => import('../pages/Dashboard/Profile.vue') }
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
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'login', component: () => import('pages/Authentication/Login.vue') }
    ]
  },
  {
    path: '/logout',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'logout', component: () => import('pages/Authentication/Logout.vue') }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name:'register', component: () => import('pages/Authentication/Signup.vue') }
    ]
  },
  {
    path: '/forgot-password',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'forgot-password', component: () => import('pages/Authentication/ForgotPassword.vue') }
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
