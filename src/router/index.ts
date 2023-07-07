import { createRouter, createWebHistory } from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/stores/user'
import pinia from '@/stores'

nprogress.configure({ showSpinner: false })

const menuRoutes = [
  {
    // 数据大屏
    path: '/screen',
    name: 'screen',
    component: () => import('@/views/layout/screen/index.vue'),
    meta: {
      title: '数据大屏',
      icon: 'Platform'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/layout/home/index.vue'),
    meta: {
      title: '首页',
      icon: 'HomeFilled'
    }
  },
  {
    path: '/acl',
    name: 'acl',
    redirect: 'user',
    meta: {
      title: '权限管理',
      icon: 'Lock'
    },
    children: [
      {
        path: '/acl/user',
        name: 'user',
        component: () => import('@/views/layout/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'User'
        }
      },
      {
        path: '/acl/role',
        name: 'role',
        component: () => import('@/views/layout/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'UserFilled'
        }
      },
      {
        path: '/acl/permission',
        name: 'permission',
        component: () => import('@/views/layout/acl/permission/index.vue'),
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
    redirect: 'trademark',
    meta: {
      title: '商品管理',
      icon: 'ShoppingCart'
    },
    children: [
      {
        path: '/product/trademark',
        name: 'trademark',
        component: () => import('@/views/layout/product/trademark/index.vue'),
        meta: {
          title: '品牌管理',
          icon: 'Coin'
        }
      },
      {
        path: '/product/attr',
        name: 'attr',
        component: () => import('@/views/layout/product/attr/index.vue'),
        meta: {
          title: '属性管理',
          icon: 'PriceTag'
        }
      },
      {
        path: '/product/spu',
        name: 'spu',
        component: () => import('@/views/layout/product/spu/index.vue'),
        meta: {
          title: 'spu管理',
          icon: 'GoodsFilled'
        }
      },
      {
        path: '/product/sku',
        name: 'sku',
        component: () => import('@/views/layout/product/sku/index.vue'),
        meta: {
          title: 'sku管理',
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
// 前置守卫
router.beforeEach((to, from, next) => {
  document.title = `硅谷甄选-${to.meta.title}`
  nprogress.start()
  const userStore = useUserStore(pinia)
  // 获取token
  const token = userStore.userInfo.token
  if (token) {
    // 用户已登录
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    // 用户未登录
    if (to.path === '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
  //
})
// 后置守卫
router.afterEach(() => {
  nprogress.done()
})
// export default router
export { router, menuRoutes }
