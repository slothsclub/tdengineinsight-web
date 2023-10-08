import {createRouter, createWebHistory, createWebHashHistory} from "vue-router"
import Overview from "../screen/Overview.vue";
import InstanceLayout from "../layout/InstanceLayout.vue";
import DefaultLayout from "../layout/DefaultLayout.vue";
import Browser from "../screen/Browser.vue";
import Query from "../screen/Query.vue";
import Cluster from "../screen/Cluster.vue";
import Subscribe from "../screen/Subscribe.vue";
import Configuration from "../screen/Configuration.vue";
import ClientList from "../screen/ClientList.vue";
import usePageTitle from "../support/page-title.js";
import Schema from "../screen/Schema.vue";
import Connections from "../screen/Connections.vue";
import Instances from "../screen/Instances.vue";
import Stream from "../screen/Stream.vue";

const routes = [
    {
        path: '/', component: DefaultLayout, children: [
            {path: '', component: Instances, name: "instances"}
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
            {path: 'schema', component: Schema, name: "schema"},
            {path: 'stream', component: Stream, name: "stream"},
            {path: 'subscribe', component: Subscribe, name: "subscribe"},
            {path: 'configuration', component: Configuration, name: "configuration"},
            {path: 'client-list', component: ClientList, name: "clientList"},
            {path: 'connections', component: Connections, name: "connections"},
        ]
    },
]
const router = createRouter({
    history: import.meta.env.VITE_ROUTE_MODE === "hash" ? createWebHashHistory() : createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    usePageTitle(to.name)
    return true
})

export default router
