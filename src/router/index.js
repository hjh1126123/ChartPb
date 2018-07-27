import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const Login = () => import('../components/login/login');//登录页

const Index = () => import('../components/index/index');//主页

//子页
const Exception = () => import('../components/exception/exception'); //异常处理
const ExIndex = () =>
    import('../components/exception/child/index');//总的异常数

const Income = () => import('../components/income/income'); //异常处理

const Quantity = () => import('../components/quantity/quantity');


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
                },
                {
                    path: '/quantity',
                    name: 'quantity',
                    component: Quantity,
                    meta: {
                        requiresAuth: true
                    }
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})