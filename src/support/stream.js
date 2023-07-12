import {useStreamStore} from "../store/stream.js";
import useHttpClient from "./http.js";
import {createVNode, onMounted, watch} from "vue";
import {useAppStore} from "../store/app.js";
import {storeToRefs} from "pinia";
import {apis} from "../config/apis.js";
import {Modal} from "ant-design-vue";
import i18n from "../locale/i18n.js";
import {ExclamationCircleOutlined} from "@ant-design/icons-vue";

export default function useStream() {
    const {httpGet, httpPost} = useHttpClient()
    const appStore = useAppStore()
    const {instanceReady} = storeToRefs(appStore)
    const streamStore = useStreamStore()

    const queryStreams = () => {
        httpGet(apis.meta.streams).then(res => {
            streamStore.streams.items = res.data
        })
    }
    const createStream = () => {
        if (!streamStore.sql) return
        streamStore.streams.loading = true
        httpPost(apis.sql.exec, {rawSql: streamStore.sql}).then(res => {
            queryStreams()
            streamStore.createStreamFormVisible = false
        }).finally(() => {
            streamStore.streams.loading = false
        })
    }
    const deleteStream = (stream) => {
        const sql = `DROP STREAM IF EXISTS ${stream.streamName};`
        Modal.confirm({
            title: i18n.global.t("ui.label.deleteStream"),
            icon: createVNode(ExclamationCircleOutlined),
            content: i18n.global.t("ui.tips.deleteStream", [`${stream.streamName}`]),
            onOk() {
                return new Promise((resolve, reject) => {
                    httpPost(apis.sql.exec, {rawSql: sql}).then(() => {
                        queryStreams()
                        resolve()
                    }, () => {
                        reject()
                    })
                })
            },
            onCancel() {
            },
            centered: true,
            maskClosable: true,
            width: 800,
            cancelText: i18n.global.t("common.no"),
            okText: i18n.global.t("common.yes"),
            okType: "primary",
            okButtonProps: {danger: "danger"}
        })
    }

    const handleOpenCreateStream = () => {
        streamStore.createStreamFormVisible = true
    }

    watch(instanceReady, (n) => {
        if (!n) return
        queryStreams()
    })
    onMounted(() => {
        if (instanceReady.value) queryStreams()
    })
    return {
        queryStreams,
        createStream,
        deleteStream,

        handleOpenCreateStream,
    }
}
