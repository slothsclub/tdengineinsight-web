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
    const formState = reactive({
        updating: false,
        creating: false,
        deleting: false
    })

    const filter = ref()
    const isFetching = computed(() => {
        return allInstances.loading
    })
    const isUpdating = computed(() => {
        return formState.updating
    })
    const isCreating = computed(() => {
        return formState.creating
    })
    const isDeleting = computed(() => {
        return formState.deleting
    })
    const total = computed(() => {
        return allInstances.data ? allInstances.data.length : -1
    })

    const instances = computed(() => {
        if (filter.value) {
            return allInstances.data.filter(item => {
                return item.name.indexOf(filter.value) >= 0 || item.host.indexOf(filter.value) >= 0 || item.port == filter.value
            })
        }
        return allInstances.data
    })

    return {current, instances, filter, isFetching, allInstances, formState, isUpdating, isCreating, isDeleting, total}
})
