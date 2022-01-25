export default [
  {
    path: '/login',
    layout: false,
    routes: [
      {
        name: '登录',
        path: '/login',
        component: './login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: '任务管理',
    path: '/task',
    icon: 'icon-zhanghao',
    component: './task',
  },
  {
    name: '事件管理',
    path: '/event',
    icon: 'icon-zhanghao',
    component: './event',
  },
  {
    name: '属性管理',
    path: '/attribute',
    icon: 'icon-zhanghao',
    component: './attribute',
  },
  {
    name: '页面管理',
    path: '/page',
    icon: 'icon-zhanghao',
    component: './page',
  },
  {
    name: '预警管理',
    path: '/warning',
    icon: 'icon-zhanghao',
    component: './warning',
  },

  {
    path: '/',
    redirect: '/task',
  },
  {
    component: './404',
  },
];
