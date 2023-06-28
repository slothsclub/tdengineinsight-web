import {useAxios} from '@vueuse/integrations/useAxios'
import axios from 'axios'
import {baseURL, apis} from "../config/apis.js"
import {onBeforeMount, reactive} from "vue";
import {useRoute, useRouter} from 'vue-router'
import {notification} from 'ant-design-vue';

const router = useRouter()
const requestInterceptor = config => {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    return config;
}
const instance = axios.create({
    baseURL: baseURL,
})
const options = {
    immediate: true
}

//https://github.com/axios/axios#interceptors
instance.interceptors.response.use(function (response) {
    let payload = response.data?.payload
    let code = response.data?.code
    let message = response.data?.message

    if (code === "SUCCESS") {
        response.data = payload
        return response
    }
    notification.error({
        message: code,
        description: message
    })

    if (code === "DATASOURCE_NOT_FOUND") {
        router.push({name: "instances"})
    }
    return Promise.reject(message)
}, (error) => {
    if (error?.response?.status !== 422) {
        notification.error({
            message: error?.response?.data?.code,
            description: error?.response?.data?.message
        })
    }
    return Promise.reject(error?.response?.data);
})
instance.interceptors.request.use(requestInterceptor);

export default function useHttpClient() {
    const route = useRoute()

    const pathVariable = reactive({
        instance: null
    })

    const urlFormat = (url) => {
        if (url.startsWith("http")) {
            return url
        }
        route.params.id && addPathVariable('instance', route.params.id)
        for (let k in pathVariable) {
            url = url.replace(`:${k}`, pathVariable[k])
        }
        return url
    }

    const addPathVariable = (k, v) => {
        pathVariable[k] = v
    }

    onBeforeMount(() => {
        route.params.id && addPathVariable('instance', route.params.id)
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
