import {defineStore} from "pinia";
import {computed, reactive} from "vue";

export const useTagStore = defineStore('tag', () => {

    const allTags = reactive({
        count: 0,
        items: [],
        values: []
    })

    const tags = computed(() => {
        return allTags.items
    })

    const values = computed(() => {
        return allTags.values
    })

    const valuesGroupByName = computed(() => {
        let tags = {}
        for (let i in allTags.values) {
            let val = allTags.values[i]

            if (!tags[val.tagName]) {
                tags[val.tagName] = []
            }
            tags[val.tagName].push({value: val.tagValue})
        }
        return tags
    })

    return {
        allTags,
        tags,
        values,
        valuesGroupByName
    }
})
