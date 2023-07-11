import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import {sqlConfig} from "../config/sql-config.js";
import {useColumnStore} from "./column.js";
import {useTagStore} from "./tag.js";

export const useSchemaStore = defineStore('schema', () => {
    const columnStore = useColumnStore()
    const tagStore = useTagStore()
    const state = reactive({
        database: {
            creating: false,
            altering: false
        },
        table: {
            creating: false,
            altering: false
        }
    })

    const databaseStruct = reactive({
        create: {...sqlConfig.schema.database.create},
        alter: {...sqlConfig.schema.database.alter}
    })
    const stableStruct = reactive({
        create: {...sqlConfig.schema.stable.create},
        alter: {...sqlConfig.schema.stable.alter}
    })
    const childTableStruct = reactive({
        create: {...sqlConfig.schema.childTable.create},
        alter: {...sqlConfig.schema.childTable.alter}
    })
    const normalTableStruct = reactive({
        create: {...sqlConfig.schema.normalTable.create},
        alter: {...sqlConfig.schema.normalTable.alter}
    })

    const alterColumns = computed(() => {
        const columns = []
        for (let i in columnStore.columns.items) {
            const col = columnStore.columns.items[i]
            if (col.colName === "ts") continue
            let type = col.colType.replace(/(\(\d+\))/, "")
            columns.push({
                name: col.colName,
                type: type,
                length: col.colLength,
                minLength: ["NCHAR", "BINARY", "VARCHAR"].includes(type) ? col.colLength : null,
                state: "KEEP",
                lengthChangeable: ["NCHAR", "BINARY", "VARCHAR"].includes(type),
                origin: {
                    name: col.colName,
                    type: type,
                    length: col.colLength
                }
            })
        }
        return columns
    })
    const alterTags = computed(() => {
        const tags = []
        for (let i in tagStore.tags) {
            const tag = tagStore.tags[i]
            let type = tag.tagType.replace(/(\(\d+\))/, "")
            tags.push({
                name: tag.tagName,
                type: type,
                length: tag.tagLength,
                minLength: ["NCHAR", "BINARY", "VARCHAR"].includes(type) ? tag.tagLength : null,
                state: "KEEP",
                lengthChangeable: ["NCHAR", "BINARY", "VARCHAR"].includes(type),
                origin: {
                    name: tag.tagName,
                    type: type,
                    length: tag.tagLength
                }
            })
        }
        return tags
    })

    const createDatabaseFormRef = ref()
    const alterDatabaseFormRef = ref()
    const createTableFormRef = ref()
    const alterTableFormRef = ref()


    const currentDatabase = ref()

    return {
        state,
        currentDatabase,
        databaseStruct,
        stableStruct,
        childTableStruct,
        normalTableStruct,

        createDatabaseFormRef,
        alterDatabaseFormRef,
        createTableFormRef,
        alterTableFormRef,

        alterColumns,
        alterTags,
    }
})
