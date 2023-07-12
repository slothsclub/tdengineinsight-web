import {defineStore} from "pinia";
import {reactive, ref} from "vue";


export const useStreamStore = defineStore('stream', () => {

    const streams = reactive({
        loading: false,
        items: []
    })
    const createStreamFormVisible = ref(false)
    const sql = ref()

    return {
        streams,
        createStreamFormVisible,
        sql,
    }
})
