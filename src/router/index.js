import {createRouter, createWebHistory} from 'vue-router'
import NProgress from 'nprogress'

const routes = [
    {
        path: '/',
        component: () => import('@/pages/Home.vue'),
        meta: {auth: true, title: '主页'}
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    NProgress['start']()
    next()
})

router.afterEach((to) => {
    const title = typeof to.meta['title'] === 'function' ? to.meta['title'](to) : to.meta['title'];
    // 设置网页 title
    if (title) {
        document.title = `${title}`;
    }
    NProgress['done']()
});

export default router
