import {defineStore} from "pinia";
import {computed, reactive} from "vue";

export const usePerfStore = defineStore('perf', () => {

    const data = reactive({
        clients: [],
        connections: [],
        queries: [],
        consumers: [],
        transactions: []
    })

    const clientTotal = computed(() => {
        return data.clients.length
    })
    const connectionTotal = computed(() => {
        return data.connections.length
    })
    const currentRequest = computed(() => {
        let n = 0
        data.clients.forEach(c => {
            n += c.currentReq
        })
        return n
    })
    const totalRequest = computed(() => {
        let n = 0
        data.clients.forEach(c => {
            n += c.totalReq
        })
        return n
    })
    const totalSlowQueries = computed(() => {
        let n = 0
        data.clients.forEach(c => {
            n += c.slowQuery
        })
        return n
    })


    return {
        data,
        clientTotal,
        connectionTotal,
        currentRequest,
        totalRequest,
        totalSlowQueries,
    }
})
