import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const Exception = () => import('../components/exception/exception'); //异常处理
const Income = () => import('../components/income/income'); //异常处理
const Login = () => import('../components/login/login'); //dengl
const Index = () => import('../components/index/index'); //dengl
const TotalExc = () =>
    import('../components/exception/child/total-exc') //总的异常数
const PayUntreated = () =>
    import('../components/exception/child/pay-untreated') //付款为处理
const WarehouseUndb = () =>
    import('../components/exception/child/warehouse-undb') //出库未打板
const WarehouseUnconnect = () =>
    import('../components/exception/child/warehouse-unconnect')//出库未交接
const ConnectUnship = () =>
    import('../components/exception/child/connect-unship') //交接未起运
const ShipUnland = () =>
    import('../components/exception/child/ship-unland')//起运为降落
const LandUnclear = () =>
    import('../components/exception/child/land-unclear')//降落未清关
const SevenUnroute = () =>
    import('../components/exception/child/seven-unroute')//7天无路由

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
            redirect: { name: 'Exception' },
            children: [
                {
                    path: '/exception',
                    name: 'Exception',
                    component: Exception,
                    meta: {
                        requiresAuth: true
                    },
                    redirect: { name: 'totalExc' },
                    children: [
                        {
                            path: '/totalExc',
                            name: 'TotalExc',
                            meta: {
                                requiresAuth: true
                            },
                            component: TotalExc
                        },
                        {
                            path: '/exception/totalExc',
                            name: 'totalExc', //付款未处理 -
                            meta: {
                                requiresAuth: true
                            },
                            component: TotalExc
                        },
                        {
                            path: '/exception/payUntreated',
                            name: 'payUntreated', //付款未处理 -
                            meta: {
                                requiresAuth: true
                            },
                            component: PayUntreated
                        },
                        {
                            path: '/exception/warehouseUndb',
                            name: 'warehouseUndb',//出库未打板
                            meta: {
                                requiresAuth: true
                            },
                            component: WarehouseUndb
                        },
                        {
                            path: '/exception/warehouseUnconnect',
                            name: 'warehouseUnconnect',//出库未交接
                            component: WarehouseUnconnect
                        },
                        {
                            path: '/exception/connectUnship',
                            name: 'connectUnship',//交接未起运
                            meta: {
                                requiresAuth: true
                            },
                            component: ConnectUnship
                        },
                        {
                            path: '/exception/shipUnland',
                            name: 'shipUnland',//起运未降落
                            meta: {
                                requiresAuth: true
                            },
                            component: ShipUnland
                        },
                        {
                            path: '/exception/landUnclear',
                            name: 'landUnclear',//起运未清关
                            meta: {
                                requiresAuth: true
                            },
                            component: LandUnclear

                        },
                        {
                            path: '/exception/sevenUnroute',
                            name: 'sevenUnroute',//七天无路由
                            meta: {
                                requiresAuth: true
                            },
                            component: SevenUnroute
                        }

                    ]
                },
                {
                    path:'/income',
                    name:'Income',
                    component:Income,
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