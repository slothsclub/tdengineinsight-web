import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {sqlConfig} from "../config/sql-config.js";

export const useSchemaStore = defineStore('schema', () => {
    const currentDatabase = ref()
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

    const createDatabaseFormRef = ref()
    const alterDatabaseFormRef = ref()


    return {
        state,
        currentDatabase,
        databaseStruct,
        stableStruct,
        childTableStruct,
        normalTableStruct,

        createDatabaseFormRef,
        alterDatabaseFormRef
    }
})
