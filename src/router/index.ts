import { createRouter, createWebHistory } from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/stores/user'
import pinia from '@/stores'
import { useCategoryStore } from '@/stores/category'

nprogress.configure({ showSpinner: false })

// 常量路由
const constantRoute = [
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
  }
]
// any路由
const anyRoute = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any'
  }
]
// 异步路由
const asyncRoute = [
  {
    path: '/acl',
    name: 'Acl',
    redirect: 'user',
    meta: {
      title: '权限管理',
      icon: 'Lock'
    },
    children: [
      {
        path: '/acl/user',
        name: 'User',
        component: () => import('@/views/layout/acl/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'User'
        }
      },
      {
        path: '/acl/role',
        name: 'Role',
        component: () => import('@/views/layout/acl/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'UserFilled'
        }
      },
      {
        path: '/acl/permission',
        name: 'Permission',
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
    name: 'Product',
    redirect: 'trademark',
    meta: {
      title: '商品管理',
      icon: 'ShoppingCart'
    },
    children: [
      {
        path: '/product/trademark',
        name: 'Trademark',
        component: () => import('@/views/layout/product/trademark/index.vue'),
        meta: {
          title: '品牌管理',
          icon: 'Coin'
        }
      },
      {
        path: '/product/attr',
        name: 'Attr',
        component: () => import('@/views/layout/product/attr/index.vue'),
        meta: {
          title: '属性管理',
          icon: 'PriceTag'
        }
      },
      {
        path: '/product/spu',
        name: 'Spu',
        component: () => import('@/views/layout/product/spu/index.vue'),
        meta: {
          title: 'spu管理',
          icon: 'GoodsFilled'
        }
      },
      {
        path: '/product/sku',
        name: 'Sku',
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
      redirect: '/home',
      path: '/',
      component: () => import('@/views/layout/index.vue'),
      name: 'layout',
      // menu 菜单
      children: constantRoute
    },
    {
      path: '/404',
      component: () => import('@/views/404/index.vue')
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
router.beforeEach(async to => {
  document.title = `硅谷甄选-${to.meta.title}`
  nprogress.start()
  const userStore = useUserStore(pinia)
  // 获取token
  const token = userStore.userInfo.token
  if (token) {
    // 用户已登录
    if (to.path === '/login') {
      return { path: '/' }
    } else {
      // // 当页面刷新的时候，asyncRoutes 没有进行数据持久化，页面刷新就会清空
      if (userStore.userInfo.asyncRoutes.length === 0) {
        // 添加任意路由
        anyRoute.forEach((route: any) => {
          router.addRoute(route)
        })
        // 添加异步路由
        await userStore.getUserInfo()
        return { ...to, replace: true }
      } else {
        return true
      }
    }
  } else {
    // 用户未登录
    if (to.path === '/login') {
      return true
    } else {
      return { path: '/login', query: { redirect: to.path } }
    }
  }
})
// 后置守卫
router.afterEach(() => {
  nprogress.done()
  // 路由跳转清空 categoryStore 中的数据
  const categoryStore = useCategoryStore()
  categoryStore.$reset()
})
// export default router
export { router, constantRoute, asyncRoute, anyRoute }
