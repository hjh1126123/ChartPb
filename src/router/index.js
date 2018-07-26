import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const Exception = () => import('../components/exception/exception'); //异常处理
const Income = () => import('../components/income/income'); //异常处理
const Login = () => import('../components/login/login'); //dengl
const Index = () => import('../components/index/index'); //dengl

const ExIndex = () =>
    import('../components/exception/child/index');//总的异常数

export default new Router({
    routes: [
        {
            path: '/index',
            name: 'Index',
            component: Index,
            redirect: '/'
        },
        {
            path: '/',
            name: 'Index',
            component: Index,
            meta: {
                requiresAuth: true
            },
            redirect: {name: 'Exception'},
            children: [
                {
                    path: '/exception',
                    name: 'Exception',
                    component: Exception,
                    meta: {
                        requiresAuth: true
                    },
                    redirect: { name: 'index' },
                    children: [
                        {
                            path: '/exception/index',
                            name: 'index',
                            meta: {
                                requiresAuth: true
                            },
                            component: ExIndex
                        }
                    ]
                },
                {
                    path: '/income',
                    name: 'Income',
                    component: Income,
                    meta: {
                        requiresAuth: true
                    }
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})