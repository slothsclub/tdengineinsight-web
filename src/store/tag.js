import {defineStore} from "pinia";
import {computed, reactive} from "vue";

export const useTagStore = defineStore('tag', () => {

    const allTags = reactive({
        count: 0,
        items: []
    })

    const tags = computed(() => {
        return allTags.items
    })

    return {
        allTags,
        tags
    }
})
