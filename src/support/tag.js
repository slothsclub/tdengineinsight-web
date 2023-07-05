import {watch} from "vue";
import {useAppStore} from "../store/app.js";
import {storeToRefs} from "pinia";
import useHttpClient from "./http.js";
import {useTableStore} from "../store/table.js";
import {apis} from "../config/apis.js";
import {useTagStore} from "../store/tag.js";
import {useDatabaseStore} from "../store/database.js";

export default function useTag() {
    const {httpGet} = useHttpClient()
    const appStore = useAppStore()
    const {currentInstanceId, instanceReady} = storeToRefs(appStore)
    const databaseStore = useDatabaseStore()
    const tableStore = useTableStore()
    const {currentTableName, mode} = storeToRefs(tableStore)
    const tagStore = useTagStore()

    const queryTags = () => {
        if(mode.value === "normalTable") return
        httpGet(apis.meta.tags, {
            dbName: databaseStore.currentDatabase.name,
            tableName: currentTableName.value,
            tableType: mode.value
        }).then(res => {
            tagStore.allTags.items = res.data
            tagStore.allTags.count = res.data.length
        })
    }

    const registerListener = () => {
        watch([instanceReady, currentTableName], () => {
            if (!instanceReady.value || !currentTableName.value) return
            queryTags()
        }, {immediate: true})
    }

    return {
        queryTags,
        registerListener,
    }
}
