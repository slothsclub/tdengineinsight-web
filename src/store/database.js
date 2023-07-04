import {defineStore} from "pinia";
import {computed, reactive} from "vue";

export const useDatabaseStore = defineStore('database', () => {

    const databases = reactive({
        system: [],
        userDefined: []
    })

    const currentDatabase = reactive({
        name: null
    })

    const defaultDatabaseName = computed(() => {
        return databases.userDefined.length > 0 ? databases.userDefined[0].name : null
    })

    const hasDatabase = computed(() => {
        return databases.userDefined.length > 0
    })

    return {
        databases,
        hasDatabase,
        currentDatabase,
        defaultDatabaseName
    }
})
