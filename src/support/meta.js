import {computed, onMounted, watch} from "vue";
import {useAppStore} from "../store/app.js";
import useHttpClient from "./http.js";
import {apis} from "../config/apis.js";
import {storeToRefs} from "pinia";
import {useMetaStore} from "../store/meta.js";

export default function useMeta() {

    const appStore = useAppStore()
    const metaStore = useMetaStore()
    const {currentInstanceId, instanceReady} = storeToRefs(appStore)
    const {httpGet} = useHttpClient()


    const queryClusterInfo = () => {
        httpGet(apis.meta.cluster).then(res => {
            metaStore.data.cluster = res.data.value[0]
        })
    }
    const queryMNodes = () => {
        httpGet(apis.meta.mnodes).then(res => {
            metaStore.data.mnodes = res.data
        })
    }
    const queryDNodes = () => {
        httpGet(apis.meta.dnodes).then(res => {
            metaStore.data.dnodes = res.data
        })
    }

    const queryQNodes = () => {
        httpGet(apis.meta.qnodes).then(res => {
            metaStore.data.qnodes = res.data
        })
    }

    const queryConfigs = () => {
        httpGet(apis.meta.configs).then(res => {
            metaStore.data.configs = res.data
        })
    }

    const queryDNodesVariables = () => {
        httpGet(apis.meta.dnode_variables).then(res => {
            metaStore.data.dnodeVariables = res.data
        })
    }

    const queryServerVersion = () => {
        httpGet(apis.meta.version).then(res => {
            appStore.instanceInfo.serverVersion = res.data
        })
    }

    return {
        queryClusterInfo,
        queryMNodes,
        queryDNodes,
        queryQNodes,
        queryConfigs,
        queryDNodesVariables,
        queryServerVersion,
    }
}
