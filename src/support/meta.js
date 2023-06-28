import {computed, onMounted, watch} from "vue";
import {useAppStore} from "../store/app.js";
import useHttpClient from "./http.js";
import {apis} from "../config/apis.js";
import {storeToRefs} from "pinia";

export default function useMeta() {

    const appStore = useAppStore()
    const {currentInstanceId, instanceReady} = storeToRefs(appStore)
    const {httpGet} = useHttpClient()

    const queryClusterInfo = () => {
        httpGet(apis.meta.cluster)
    }

    watch([currentInstanceId, instanceReady], ([m, n]) => {
        if(m && n) {
            queryClusterInfo()
        }
    }, {immediate: true})

    return {
        queryClusterInfo
    }
}
