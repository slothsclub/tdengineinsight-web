import {reactive, ref, watch} from "vue";
import useHttpClient from "./http.js";
import {apis} from "../config/apis.js";
import {useInstanceStore} from "../store/instance.js";
import {useRouter} from "vue-router";
import useValidation from "./validation.js";

export function useInstances() {
    const router = useRouter()
    const {httpGet, httpPost, httpPut, httpDelete} = useHttpClient()
    const instanceStore = useInstanceStore()
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
        instanceForm.validate = {...fieldState}
        const {data, isFinished, isLoading, error} = httpPost(apis.createInstance, instanceForm.state).then(() => {
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
        const {data} = httpPut(apis.updateInstance, instanceForm.state, {id: instanceForm.id}).then(() => {
            queryInstances()
            instanceForm.visible = false
        }, err => {
            instanceForm.validate = {...formatValidationErrors(err, fieldState)}
        }).finally(() => {
            instanceStore.formState.updating = false
        })
    }

    const deleteInstance = (instance) => {
        return httpDelete(apis.deleteInstance, {id: instance.id})
    }

    const openInstance = (instance) => {
        instanceStore.current.loading = true
        return new Promise((resolve, reject) => {
            httpPost(apis.openInstance, null, {id: instance.id}).then((res) => {
                instanceStore.current.instance = res.data
                router.push({name: "overview", params: {id: instance.id}})
                resolve()
            }, reject).finally(() => {
                instanceStore.current.loading = false
            })
        })
    }

    //todo
    const closeInstanceDatasource = () => {}

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
        setFormState,
        resetFormState
    }
}
