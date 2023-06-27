import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";

export const useInstanceStore = defineStore('instance', () => {
    const current = reactive({
        loading: false,
        instance: null
    })
    const allInstances = reactive({
        loading: false,
        data: []
    })
    const filter = ref()
    const loading = computed(() => {
        return allInstances.loading
    })

    const instances = computed(() => {
        if (filter.value) {
            return allInstances.data.filter(item => {
                return item.name.indexOf(filter.value) >= 0 || item.host.indexOf(filter.value) >= 0 || item.port == filter.value
            })
        }
        return allInstances.data
    })

    return {current, instances, filter, loading, allInstances}
})
