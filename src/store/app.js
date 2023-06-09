import { defineStore } from 'pinia'
import {ref, watch} from "vue";
import i18n from "../locale/i18n.js";

//https://pinia.vuejs.org/core-concepts/
export const useAppStore = defineStore('app', () => {
    const appName = ref("TDengineInsight")
    const selectedInstance = ref(false)
    const pageInfo = ref({
        title: String,
        description: String
    })

    watch(pageInfo.value, (n) => {
        document.title = `${i18n.global.t(pageInfo.value.title)} | ${appName.value}`
    })

    return {appName, selectedInstance, pageInfo}
})
