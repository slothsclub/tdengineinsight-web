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
    })

    const readableUptime = computed(() => {
        return data.cluster.uptime / 3600
    })

    return {
        data,
        readableUptime,
    }
})
