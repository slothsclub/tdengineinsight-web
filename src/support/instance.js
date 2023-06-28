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
        instanceForm.loading = true
        instanceStore.formState.creating = true
        const {data, isFinished, isLoading, error} = httpPost(apis.createInstance, instanceForm.state).then(() => {
            queryInstances()
            instanceForm.visible = false
        }).finally(() => {
            instanceStore.formState.creating = false
        })
    }

    const updateInstance = () => {
        addPathVariable("id", instanceForm.id)
        instanceStore.formState.updating = true
        const {data} = httpPut(apis.updateInstance, instanceForm.state).then(() => {
            queryInstances()
            instanceForm.visible = false
        }).finally(() => {
            instanceStore.formState.updating = false
        })
    }

    const deleteInstance = (instance) => {
        addPathVariable("id", instance.id)
        return httpDelete(apis.deleteInstance)
    }

    const openInstance = (instance) => {
        addPathVariable("instance", instance.id)
        instanceStore.current.loading = true
        const {data} = httpPost(apis.openInstance).then(() => {
            instanceStore.current.instance = data
            router.push({name: "overview", params: {id: instance.id}})
        }).finally(() => {
            instanceStore.current.loading = false
        })
    }

    //todo
    const closeInstanceDatasource = () => {}

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
