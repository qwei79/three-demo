import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const routes = [
  {
    path: '/index',
    redirect: '/',
  },
  {
    path: '/',
    component: () => import('../views/home.vue'),
    props: true,
    children: [
      {
        path: '',
        redirect: '/base',
      },
      {
        path: '/base',
        component: () => import('../views/base/index.vue'),
      },
      {
        path: '/geometry',
        component: () => import('../views/geometry/index.vue'),
        props: true,
        children: [
          {
            path: '/geometry',
            redirect: '/geometry/box',
          },
          {
            path: 'box',
            component: () => import('../views/geometry/box.vue'),
          },
          {
            path: 'cone',
            component: () => import('../views/geometry/cone.vue'),
          },
          {
            path: 'sphere',
            component: () => import('../views/geometry/sphere.vue'),
          },
          {
            path: 'torus',
            component: () => import('../views/geometry/torus.vue'),
          },
        ],
      },
      {
        path: '/demos',
        children: [
          {
            path: 'machineRoom',
            component: () => import('../views/demos/machine-room/index.vue'),
            props: true,
          },
        ],
      }
    ],
  },
  
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_DOMAIN),
  routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  // 设置页面标题
  document.title = to.meta.title || 'Three Track';
  next();
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

export default router;