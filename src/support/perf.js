import {useAppStore} from "../store/app.js";
import {storeToRefs} from "pinia";
import {usePerfStore} from "../store/perf.js";
import useHttpClient from "./http.js";
import {apis} from "../config/apis.js";

export default function usePerf() {

    const appStore = useAppStore()
    const perfStore = usePerfStore()
    const {httpGet} = useHttpClient()
    const {currentInstanceId, instanceReady} = storeToRefs(appStore)


    const queryClientInfo  = () => {
        if(!instanceReady.value) return
        httpGet(apis.perf.apps).then(res => {
            perfStore.data.clients = res.data
        })
    }
    const queryConnectionInfo = () => {
        if(!instanceReady.value) return
        httpGet(apis.perf.connections).then(res => {
            perfStore.data.connections = res.data
        })
    }

    const queryQueries = () => {
        if(!instanceReady.value) return
        httpGet(apis.perf.queries).then(res => {
            perfStore.data.queries = res.data
        })
    }

    const queryTransactions = () => {
        if(!instanceReady.value) return
        httpGet(apis.perf.trans).then(res => {
            perfStore.data.transactions = res.data
        })
    }

    const queryConsumers = () => {
        if(!instanceReady.value) return
        httpGet(apis.perf.consumers).then(res => {
            perfStore.data.consumers = res.data
        })
    }

    return {
        queryClientInfo,
        queryConnectionInfo,
        queryQueries,
        queryTransactions,
        queryConsumers,
    }
}
