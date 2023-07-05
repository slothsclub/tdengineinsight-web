import { defineStore } from 'pinia'
import {computed, reactive, ref, watch} from "vue";
import i18n from "../locale/i18n.js";
import {useRoute} from "vue-router";

//https://pinia.vuejs.org/core-concepts/
export const useAppStore = defineStore('app', () => {
    const route = useRoute()
    const appName = ref("TDengineInsight")
    const currentInstanceId = computed(() => {
        return route.params.id
    })
    const pageInfo = ref({
        title: String,
        description: String
    })
    const globalSwitchInstance = reactive({
        loading: false,
        ready: false
    })
    const instanceInfo = reactive({
        serverVersion: null
    })
    const instanceReady = computed(() => {
        return route.params.id && globalSwitchInstance.ready
    })

    watch(pageInfo.value, (n) => {
        document.title = `${pageInfo.value.title} | ${appName.value}`
    })

    return {appName, currentInstanceId, pageInfo, globalSwitchInstance, instanceReady, instanceInfo}
})
