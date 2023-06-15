import {useAxios} from '@vueuse/integrations/useAxios'
import axios from 'axios'
import {baseURL, apis} from "../config/apis.js"
import {onBeforeMount, reactive} from "vue";
import {useRoute} from 'vue-router'

const instance = axios.create({
    baseURL: baseURL,
})
const options = {
    immediate: true
}

export default function useHttpClient() {
    const route = useRoute()

    const pathVariable = reactive({
        instance: null
    })

    const urlFormat = (url) => {
        if (url.startsWith("http")) {
            return url
        }
        addPathVariable('instance', route.params.id)
        for (let k in pathVariable) {
            url = url.replace(`:${k}`, pathVariable[k])
        }
        return url
    }

    const addPathVariable = (k, v) => {
        pathVariable[k] = v
    }

    onBeforeMount(() => {
        addPathVariable('instance', route.params.id)
    })

    const httpGet = (url, query) => {
        return useAxios(urlFormat(url), {method: 'GET', params: query}, instance, options)
    }

    const httpPost = (url, data) => {
        return useAxios(urlFormat(url), {method: 'POST', data: data}, instance, options)
    }

    const httpPut = (url, data) => {
        return useAxios(urlFormat(url), {method: 'PUT', data: data}, instance, options)
    }

    const httpDelete = (url) => {
        return useAxios(urlFormat(url), {method: 'DELETE'}, instance, options)
    }

    return {apis, httpGet, httpPost, httpPut, httpDelete, addPathVariable}
}
