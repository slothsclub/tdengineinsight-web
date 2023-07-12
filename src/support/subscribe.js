import useHttpClient from "./http.js";
import {useSubscribeStore} from "../store/subscribe.js";
import {createVNode, onBeforeUnmount, onMounted, watch} from "vue";
import {useAppStore} from "../store/app.js";
import {storeToRefs} from "pinia";
import {apis} from "../config/apis.js";
import {Modal} from "ant-design-vue";
import i18n from "../locale/i18n.js";
import {ExclamationCircleOutlined} from "@ant-design/icons-vue";

export default function useSubscribe() {
    const {httpPost, httpGet} = useHttpClient()
    const appStore = useAppStore()
    const {instanceReady} = storeToRefs(appStore)
    const subscribeStore = useSubscribeStore()
    const {selectedTopic} = storeToRefs(subscribeStore)

    const queryTopics = () => {
        httpGet(apis.meta.topics, {dbName: null}).then(res => {
            subscribeStore.subscribe.topics = res.data
            if (res.data && res.data?.value?.length > 0) {
                subscribeStore.selectedTopic = res.data.value[0]
            }
        })
    }
    const createTopic = () => {
        if (!subscribeStore.sql.topic) return
        subscribeStore.loadingState.creatingTopic = true
        httpPost(apis.sql.exec, {rawSql: subscribeStore.sql.topic}).then(res => {
            queryTopics()
            subscribeStore.createTopicFormVisible = false
        }).finally(() => {
            subscribeStore.loadingState.creatingTopic = false
        })
    }
    const deleteTopic = (topic) => {
        const sql = `DROP TOPIC IF EXISTS ${topic.topicName};`

        Modal.confirm({
            title: i18n.global.t("ui.label.deleteTopic"),
            icon: createVNode(ExclamationCircleOutlined),
            content: i18n.global.t("ui.tips.deleteTopic", [`${topic.dbName}.${topic.topicName}`]),
            onOk() {
                return new Promise((resolve, reject) => {
                    httpPost(apis.sql.exec, {rawSql: sql}).then(() => {
                        queryTopics()
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

    const querySubscriptions = () => {
        httpGet(apis.meta.subscriptions).then(res => {
            subscribeStore.subscribe.subscriptions = res.data
        })
    }
    const deleteSubscription = (subscription) => {
        const sql = `DROP CONSUMER GROUP IF EXISTS ${subscription.consumerGroup} ON ${subscription.topicName};`

        Modal.confirm({
            title: i18n.global.t("ui.label.deleteConsumer"),
            icon: createVNode(ExclamationCircleOutlined),
            content: i18n.global.t("ui.tips.deleteConsumer", [`${subscription.consumerGroup} ${subscription.topicName}`]),
            onOk() {
                return new Promise((resolve, reject) => {
                    httpPost(apis.sql.exec, {rawSql: sql}).then(() => {
                        querySubscriptions()
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


    const handleOpenCreateTopic = () => {
        subscribeStore.createTopicFormVisible = true
    }
    const handleSelectTopic = (topic) => {
        subscribeStore.selectedTopic = topic
    }

    watch(instanceReady, (n) => {
        if (!n) return
        queryTopics()
        querySubscriptions()
    }, {immediate: true})

    onMounted(() => {

    })
    onBeforeUnmount(() => {

    })
    return {
        queryTopics,
        createTopic,
        deleteTopic,
        deleteSubscription,
        querySubscriptions,

        handleOpenCreateTopic,
        handleSelectTopic,
    }
}
