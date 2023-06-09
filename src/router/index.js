import {createRouter, createWebHistory} from "vue-router"
import Overview from "../screen/Overview.vue";
import AddInstance from "../screen/AddInstance.vue";
import InstanceLayout from "../layout/InstanceLayout.vue";
import DefaultLayout from "../layout/DefaultLayout.vue";
import Browser from "../screen/Browser.vue";
import Query from "../screen/Query.vue";
import Cluster from "../screen/Cluster.vue";
import Subscribe from "../screen/Subscribe.vue";
import Export from "../screen/Export.vue";
import Privileges from "../screen/Privileges.vue";
import Configuration from "../screen/Configuration.vue";
import ClientList from "../screen/ClientList.vue";
import usePageTitle from "../support/pageTitle.js";

const routes = [
    {
        path: '/', component: DefaultLayout, children: [
            {path: '', component: AddInstance, name: "addInstance"}
        ]
    },
    {
        path: '/instance/:id',
        component: InstanceLayout,
        children: [
            {path: '', component: Overview, name: "overview"},
            {path: 'browser', component: Browser, name: "browser"},
            {path: 'query', component: Query, name: "query"},
            {path: 'cluster', component: Cluster, name: "cluster"},
            {path: 'subscribe', component: Subscribe, name: "subscribe"},
            {path: 'export', component: Export, name: "export"},
            {path: 'privileges', component: Privileges, name: "privileges"},
            {path: 'configuration', component: Configuration, name: "configuration"},
            {path: 'client-list', component: ClientList, name: "clientList"},
        ]
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    usePageTitle(to.name)
    return true
})

export default router
