import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

//登录
const Login = () => import('../components/login/login');

//内容主页
const Index = () => import('../components/index/index');

//子页
//*******
//异常页
const Exception = () => import('../components/exception/exception');
//异常页子页
const ExIndex = () => import('../components/exception/child/index');

//财务页
const Financial = () => import('../components/financial');
//财务收入
const F_Income = () => import('../components/financial/child/income');
//财务监控
const F_Monitoring = () => import('../components/financial/child/monitoring');
//财务对账
const F_Checking = () => import('../components/financial/child/checking');
//财务其他
const F_Other = () => import('../components/financial/child/other');

//件量页
//普通件量
const Quantity = () => import('../components/quantity/quantity');

//会员页
const member = () => import('../components/member');
//普通会员
const M_Normal = () => import('../components/member/child/memberNormal');
//监控
const M_Monitoring = () => import('../components/member/child/monitoring');
//点击
const M_hits = () => import('../components/member/child/hits');
//******

//设置页
const set = () => import('../components/setting');

const router = new Router({
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
            redirect: {
                name: 'Exception'
            },
            children: [
                {
                    path: '/exception',
                    name: 'Exception',
                    component: Exception,
                    meta: {
                        requiresAuth: true
                    },
                    redirect: {
                        name: 'childException',
                        params: {
                            createCenterCode: 'USDB,JPDB,JPSFDB,AUDB,DEDB,UKDB'
                        }
                    },
                    children: [
                        {
                            path: '/exception/childException/:createCenterCode',
                            name: 'childException',
                            meta: {
                                requiresAuth: true
                            },
                            component: ExIndex
                        }
                    ]
                },
                {
                    path: '/financial',
                    name: 'financial',
                    component: Financial,
                    meta: {
                        requiresAuth: true
                    },
                    redirect: {
                        name: 'income'
                    },
                    children: [
                        {
                            path: '/financial/income',
                            name: 'F_Income',
                            component: F_Income,
                            meta: {
                                requiresAuth: true
                            }
                        },
                        {
                            path: '/financial/monitoring',
                            name: 'F_Monitoring',
                            component: F_Monitoring,
                            meta: {
                                requiresAuth: true
                            }
                        },
                        {
                            path: '/financial/checking',
                            name: 'F_Checking',
                            component: F_Checking,
                            meta: {
                                requiresAuth: true
                            }
                        },
                        {
                            path: '/financial/other',
                            name: 'F_Other',
                            component: F_Other,
                            meta: {
                                requiresAuth: true
                            }
                        }
                    ]
                },
                {
                    path: '/quantity',
                    name: 'quantity',
                    component: Quantity,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: '/member',
                    name: 'member',
                    component: member,
                    meta: {
                        requiresAuth: true
                    },
                    redirect: {
                        name: 'M_Normal'
                    },
                    children: [
                        {
                            path: '/member/normal',
                            name: 'M_Normal',
                            component: M_Normal,
                            meta: {
                                requiresAuth: true
                            }
                        },
                        {
                            path: '/member/monitoring',
                            name: 'M_Monitoring',
                            component: M_Monitoring,
                            meta: {
                                requiresAuth: true
                            }
                        },
                        {
                            path: '/member/hits',
                            name: 'M_hits',
                            component: M_hits,
                            meta: {
                                requiresAuth: true
                            }
                        }
                    ]
                },
                {
                    path: '/set',
                    name: 'set',
                    component: set,
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
});

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    }
    else {
        if (to.meta.requiresAuth && !sessionStorage.getItem('accessToken')) {
            next({path: '/login'});
        }
        else {
            next();
        }
    }
});

export default router;