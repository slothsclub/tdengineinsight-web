import {defineStore} from "pinia";
import {computed, reactive} from "vue";
import _ from "lodash"

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

    const retentionEnabled = computed(() => {
        const db = _.find(databases.userDefined, {name: currentDatabase.name})
        if (!db) return false
        return !!db.retentions
    })

    return {
        databases,
        hasDatabase,
        currentDatabase,
        defaultDatabaseName,
        retentionEnabled
    }
})
