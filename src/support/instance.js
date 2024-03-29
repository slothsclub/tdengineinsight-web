import {reactive, ref, watch} from "vue";
import useHttpClient from "./http.js";
import {apis} from "../config/apis.js";
import {useInstanceStore} from "../store/instance.js";
import {useRoute, useRouter} from "vue-router";
import useValidation from "./validation.js";
import {useAppStore} from "../store/app.js";

export function useInstances() {
    const route = useRoute()
    const router = useRouter()
    const {httpGet, httpPost, httpPut, httpDelete} = useHttpClient()
    const instanceStore = useInstanceStore()
    const appStore = useAppStore()
    const {formatValidationErrors} = useValidation()

    const defaultFormState = {
        name: null,
        host: null,
        port: null,
        username: null,
        password: "",
        batchfetch: false,
        batchErrorIgnore: false,
        httpConnectTimeout: 5000,
        httpSocketTimeout: 5000,
        messageWaitTimeout: 3000
    }
    const fieldState = {
        name: ["", null],
        host: ["", null],
        port: ["", null],
        username: ["", null],
        password: ["", null],
    }
    const instanceForm = reactive({
        id: null,
        state: {...defaultFormState},
        visible: false,
        validate: {...fieldState}
    })

    const queryInstances = () => {
        instanceStore.allInstances.data.loading = true
        httpGet(apis.instances.query).then(res => {
            instanceStore.allInstances.data = res.data
        }).finally(() => {
            instanceStore.allInstances.data.loading = false
        })
    }

    const createInstance = () => {
        instanceForm.loading = true
        instanceStore.formState.creating = true
        instanceForm.validate = {...fieldState}
        const {data, isFinished, isLoading, error} = httpPost(apis.instances.create, instanceForm.state).then(() => {
            queryInstances()
            instanceForm.visible = false
        }, err => {
            instanceForm.validate = {...formatValidationErrors(err, fieldState)}
        }).finally(() => {
            instanceStore.formState.creating = false
        })
    }

    const updateInstance = () => {
        instanceStore.formState.updating = true
        const {data} = httpPut(apis.instances.update, instanceForm.state, {id: instanceForm.id}).then(() => {
            queryInstances()
            instanceForm.visible = false
            closeInstanceDatasource(instanceForm)
        }, err => {
            instanceForm.validate = {...formatValidationErrors(err, fieldState)}
        }).finally(() => {
            instanceStore.formState.updating = false
        })
    }

    const deleteInstance = (instance) => {
        return httpDelete(apis.instances.delete, {id: instance.id})
    }

    const openInstance = (instance) => {
        instanceStore.current.loading = true
        return new Promise((resolve, reject) => {
            httpPost(apis.instances.open, null, {id: instance.id}).then((res) => {
                instanceStore.current.instance = res.data
                appStore.globalSwitchInstance.ready = true

                let to = route.name === "instances" ? "overview" : route.name
                router.push({name: to, params: {id: instance.id}, query: route.query})
                resolve()
            }, reject).finally(() => {
                instanceStore.current.loading = false
            })
        })
    }
    const closeInstanceDatasource = (instance) => {
        httpPost(apis.instances.close, null, {id: instance.id}).then(res => {

        })
    }

    const setFormState = (state) => {
        instanceForm.id = state.id
        instanceForm.state = {...state}
        instanceForm.validate = {...fieldState}
    }
    const resetFormState = () => {
        instanceForm.id = null
        instanceForm.state = {...defaultFormState}
        instanceForm.validate = {...fieldState}
    }

    return {
        instanceForm,
        queryInstances,
        createInstance,
        updateInstance,
        deleteInstance,
        openInstance,
        closeInstanceDatasource,
        setFormState,
        resetFormState
    }
}
