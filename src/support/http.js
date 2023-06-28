import {useAxios} from '@vueuse/integrations/useAxios'
import axios from 'axios'
import {baseURL, apis} from "../config/apis.js"
import {onBeforeMount, reactive} from "vue";
import {useRoute, useRouter} from 'vue-router'
import {notification} from 'ant-design-vue';

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
    const headers = reactive({})
    const urlFormat = (url, pathVariables) => {
        if(route?.params.id) {
            headers['x-instance-id'] = route.params.id
        }
        if (url.startsWith("http")) {
            return url
        }
        for (let k in pathVariables) {
            url = url.replace(`:${k}`, pathVariables[k])
        }
        return url
    }

    const httpGet = (url, query, pathVariables) => {
        return useAxios(urlFormat(url, pathVariables), {method: 'GET', params: query, headers: headers}, instance, options)
    }

    const httpPost = (url, data, pathVariables) => {
        return useAxios(urlFormat(url, pathVariables), {method: 'POST', data: data}, instance, options)
    }

    const httpPut = (url, data, pathVariables) => {
        return useAxios(urlFormat(url, pathVariables), {method: 'PUT', data: data}, instance, options)
    }

    const httpDelete = (url, pathVariables) => {
        return useAxios(urlFormat(url, pathVariables), {method: 'DELETE'}, instance, options)
    }

    return {apis, httpGet, httpPost, httpPut, httpDelete}
}
