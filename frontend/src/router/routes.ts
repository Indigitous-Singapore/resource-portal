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
      { path: '', name:'landing', component: () => import('pages/Pages/Landing.vue') },
      { path: 'dashboard', redirect: '/explore' },
      { path: 'register', name:'register', component: () => import('pages/Authentication/Signup.vue') },
      { path: 'forgot-password', name: 'forgot-password', component: () => import('pages/Authentication/ForgotPassword.vue') },
      { path: 'reset-password', name: 'reset-password', component: () => import('pages/Authentication/ResetPassword.vue') },
      { path: 'login', name: 'login', component: () => import('pages/Authentication/Login.vue') },
      { path: 'logout', name: 'logout', component: () => import('pages/Authentication/Logout.vue') },
      { path: 'verify-email', name:'verify-email', component: () => import('pages/Authentication/VerifyEmail.vue') },
      { path: 'email-confirmation', name:'email-confirmation', component: () => import('pages/Authentication/EmailConfirmation.vue') },
    ]
  },
  {
    path: '/auth',
    children: [
      { path: 'register', redirect: '/register' },
      { path: 'login', redirect: '/login' },
      { path: 'logout', redirect: '/logout' },
      { path: 'forgot-password', redirect: '/forgot-password' },
      { path: 'reset-password', redirect: '/reset-password' },
      { path: 'email-confirmation', redirect: '/email-confirmation' },
      { path: 'verify-email', redirect: '/verify-email' },
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
      { path: '', name: 'profile', meta: {private: true}, component: () => import('../pages/Dashboard/Profile.vue') },
      { path: ':section', meta: {private: true}, component: () => import('../pages/Dashboard/Profile.vue') }
    ]
  },
  {
    path: '/items',
    component: () => import('../layouts/DashboardLayout.vue'),
    children: [
      { path: '', meta: {private: true}, redirect: { name: 'explore' }},
      { path: ':itemId', name: 'item', meta: {private: true}, component: () => import('../pages/Dashboard/Item.vue') }
    ]
  },
  {
    path: '/collections',
    component: () => import('../layouts/DashboardLayout.vue'),
    children: [
      { path: ':collectionId', name: 'collection', meta: {private: false}, component: () => import('../pages/Pages/Collection.vue') },
      { path: '/', component: () => import('../pages/Pages/Collections.vue')},
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    name: 'error404',
    path: '*',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'generic', component: () => import('pages/Pages/Generic.vue') }
    ]
  }
];

export default routes;
