import {defineStore} from "pinia";
import {computed, reactive} from "vue";

export const useMetaStore = defineStore('meta', () => {

    const data = reactive({
        cluster: {
            id: null,
            name: null,
            createTime: null,
            uptime: null,
            version: null
        },
        mnodes: [],
        dnodes: [],
        qnodes: [],
        configs: [],
        dnodeVariables: []
    })

    const readableUptime = computed(() => {
        return data.cluster.uptime / 3600
    })

    const groupDNodeVariables = computed(() => {
        return data.dnodeVariables.reduce(function (results, v) {
            (results[v.dnodeId] = results[v.dnodeId] || []).push(v);
            return results;
        }, {})
    })

    return {
        data,
        readableUptime,
        groupDNodeVariables,
    }
})
