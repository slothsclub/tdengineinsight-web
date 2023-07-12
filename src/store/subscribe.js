import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import _ from "lodash"

export const useSubscribeStore = defineStore('subscribe', () => {

    const subscribe = reactive({
        topics: [],
        consumers: [],
        subscriptions: []
    })
    const sql = reactive({
        topic: null
    })
    const createTopicFormVisible = ref(false)
    const loadingState = reactive({
        creatingTopic: false
    })

    const selectedTopic = ref()

    const subscriptions = computed(() => {
        return _.filter(subscribe.subscriptions, (s) => {
            return s.topicName === selectedTopic.value?.topicName
        })
    })

    return {
        subscribe,
        sql,
        createTopicFormVisible,
        loadingState,
        selectedTopic,
        subscriptions
    }
})
