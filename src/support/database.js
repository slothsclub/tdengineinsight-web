import {useAppStore} from "../store/app.js";
import useHttpClient from "./http.js";
import {storeToRefs} from "pinia";
import {apis} from "../config/apis.js";
import {useDatabaseStore} from "../store/database.js";
import _ from "lodash"
import {computed, onBeforeUnmount, onMounted, watch} from "vue";
import {useRoute} from "vue-router";

export default function useDatabase(bindWatcher) {
    const appStore = useAppStore()
    const {currentInstanceId, instanceReady} = storeToRefs(appStore)
    const {httpGet} = useHttpClient()
    const databaseStore = useDatabaseStore()
    const route = useRoute()
    const userSelectedDatabase = computed(() => {
        return route.query.dbName
    })

    const queryDatabases = () => {
        httpGet(apis.meta.databases).then(res => {
            databaseStore.databases.system = _.filter(res.data.value, (db) => db.name === "information_schema" || db.name === "performance_schema")
            databaseStore.databases.userDefined = _.filter(res.data.value, (db) => {
                return db.name !== "information_schema" && db.name !== "performance_schema"
            })
            setCurrentDatabase(userSelectedDatabase.value || databaseStore.defaultDatabaseName)
        })
    }
    const setCurrentDatabase = (dbName) => {
        databaseStore.currentDatabase.name = dbName
    }

    bindWatcher && watch([currentInstanceId, instanceReady], ([m, n]) => {
        if (m && n) {
            queryDatabases()
        }
    }, {immediate: true})

    onBeforeUnmount(() => {
        databaseStore.currentDatabase.name = null
    })
    return {
        queryDatabases
    }
}
