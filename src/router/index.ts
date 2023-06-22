import { createRouter, createWebHistory } from 'vue-router'
const menuRoutes = [
  {
    // 数据大屏
    path: '/screen',
    name: 'screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      title: '数据大屏',
      icon: 'Platform'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
      icon: 'HomeFilled'
    }
  },
  {
    path: '/acl',
    name: 'acl',
    meta: {
      title: '权限管理',
      icon: 'Lock'
    },
    children: [
      {
        path: '/acl/user',
        name: 'user',
        component: () => import('@/views/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'User'
        }
      },
      {
        path: '/acl/role',
        name: 'role',
        component: () => import('@/views/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'UserFilled'
        }
      },
      {
        path: '/acl/permission',
        name: 'permission',
        component: () => import('@/views/acl/permission/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'Operation'
        }
      }
    ]
  },
  {
    path: '/product',
    name: 'product',
    meta: {
      title: '商品管理',
      icon: 'ShoppingCart'
    },
    children: [
      {
        path: '/product/trademark',
        name: 'trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        meta: {
          title: '品牌管理',
          icon: 'Coin'
        }
      },
      {
        path: '/product/attr',
        name: 'attr',
        component: () => import('@/views/product/attr/index.vue'),
        meta: {
          title: '属性管理',
          icon: 'PriceTag'
        }
      },
      {
        path: '/product/spu',
        name: 'spu',
        component: () => import('@/views/product/spu/index.vue'),
        meta: {
          title: 'spu管理',
          icon: 'GoodsFilled'
        }
      },
      {
        path: '/product/sku',
        name: 'sku',
        component: () => import('@/views/product/sku/index.vue'),
        meta: {
          title: 'spu管理',
          icon: 'WalletFilled'
        }
      }
    ]
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      name: 'login',
      meta: {
        title: '登录'
      }
    },
    {
      path: '/404',
      component: () => import('@/views/404/index.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      name: 'any'
    },
    {
      redirect: '/home',
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      name: 'layout',
      // menu 菜单
      children: menuRoutes
    }
  ],
  // 滚动行为
  scrollBehavior() {
    return {
      top: 0,
      left: 0
    }
  }
})

// export default router
export { router, menuRoutes }
