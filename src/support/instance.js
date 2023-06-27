import {reactive, ref, watch} from "vue";
import useHttpClient from "./http.js";
import {apis} from "../config/apis.js";
import {useInstanceStore} from "../store/instance.js";
import {useRouter} from "vue-router";

export function useInstances() {
    const router = useRouter()
    const {httpGet, httpPost, httpPut, httpDelete, addPathVariable} = useHttpClient()
    const instanceStore = useInstanceStore()

    const defaultFormState = {
        name: null,
        host: null,
        port: null,
        username: null,
        password: "",
        batchfetch: true,
        batchErrorIgnore: true,
        httpConnectTimeout: 5000,
        httpSocketTimeout: 5000,
        messageWaitTimeout: 3000
    }
    const instanceForm = reactive({
        loading: false,
        id: null,
        state: {...defaultFormState},
        visible: false
    })

    const queryInstances = () => {
        const {data, isFinished, isLoading} = httpGet(apis.getInstances)
        instanceStore.$patch({
            allInstances: {
                data: data,
                loading: isLoading
            }
        })
    }

    const createInstance = () => {
        const {data, isFinished, isLoading, error} = httpPost(apis.createInstance, instanceForm.state).then(() => {
            queryInstances()
            instanceForm.visible = false
        }, (err) => {

        })
        instanceForm.loading = isLoading
    }

    const updateInstance = () => {
        addPathVariable("id", instanceForm.id)
        const {data, isFinished, isLoading, error} = httpPut(apis.updateInstance, instanceForm.state).then(() => {
            queryInstances()
            instanceForm.visible = false
        })
        instanceForm.loading = isLoading
    }

    const deleteInstance = (instance) => {
        addPathVariable("id", instance.id)
        const {data, isFinished, isLoading} = httpDelete(apis.deleteInstance).then(() => {
            queryInstances()
        })
    }

    const openInstance = (instance) => {
        addPathVariable("instance", instance.id)
        const {data, isFinished, isLoading} = httpPost(apis.openInstance).then(() => {
            router.push({name: "overview", params: {id: instance.id}})
        })
        instanceStore.$patch({
            current: {
                instance: data,
                loading: isLoading
            }
        })
    }

    const setFormState = (state) => {
        instanceForm.id = state.id
        instanceForm.state = {...state}
    }
    const resetFormState = () => {
        instanceForm.id = null
        instanceForm.state = {...defaultFormState}
    }

    return {
        instanceForm,
        queryInstances,
        createInstance,
        updateInstance,
        deleteInstance,
        openInstance,

        setFormState,
        resetFormState
    }
}
