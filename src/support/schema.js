import useHttpClient from "./http.js";
import useDatabase from "./database.js";
import useTable from "./table.js";
import useColumn from "./column.js";
import useTag from "./tag.js";
import {useAppStore} from "../store/app.js";
import {storeToRefs} from "pinia";
import {computed, createVNode, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {useSchemaStore} from "../store/schema.js";
import useSchemaDatabaseBuilder from "./schema-database-builder.js";
import {apis} from "../config/apis.js";
import {sqlConfig} from "../config/sql-config.js";
import {useRoute} from "vue-router";
import useSchemaTableBuilder from "./schema-table-builder.js";
import {useDatabaseStore} from "../store/database.js";
import {typeDefine} from "../config/type.js";
import _ from "lodash"
import {useTableStore} from "../store/table.js";
import {Modal} from "ant-design-vue";
import i18n from "../locale/i18n.js";
import {ExclamationCircleOutlined} from "@ant-design/icons-vue";

export default function useSchema() {
    const {httpPost} = useHttpClient()
    const route = useRoute()
    const appStore = useAppStore()
    const {instanceReady} = storeToRefs(appStore)
    const schemaStore = useSchemaStore()
    const databaseStore = useDatabaseStore()
    const tableStore = useTableStore()

    const {queryDatabases, setCurrentDatabase} = useDatabase()
    const {
        queryStables,
        queryChildTables,
        queryNormalTables,
        queryChildAndNormalTables,
        setTableMode,
        setCurrentStable,
        setCurrentNormalTable,
        setCurrentChildTable,
    } = useTable()
    const {queryColumns} = useColumn()
    const {queryTags} = useTag()
    const {buildCreateDatabaseSql, buildDropDatabaseSql, buildAlterDatabaseSql} = useSchemaDatabaseBuilder()
    const {
        buildStableCreateSql,
        buildStableAlterSql,
        buildNormalTableCreateSql,
        buildNormalTableAlterSql,
        buildChildTableCreateSql,
        buildChildTableAlterSql,
        buildDropTableSql,
    } = useSchemaTableBuilder()

    const databaseInQuery = computed(() => {
        return route.query.dbName
    })

    const showCreateDatabaseForm = () => {
        schemaStore.createDatabaseFormRef.show()
    }
    const hideCreateDatabaseForm = () => {
        schemaStore.createDatabaseFormRef.hide()
    }
    const showAlterDatabaseForm = () => {
        schemaStore.alterDatabaseFormRef.show()
    }
    const hideAlterDatabaseForm = () => {
        schemaStore.alterDatabaseFormRef.hide()
    }
    const showCreateTableForm = () => {
        schemaStore.createTableFormRef.show()
    }
    const hideCreateTableForm = () => {
        schemaStore.createTableFormRef.hide()
    }
    const showAlterTableForm = () => {
        schemaStore.alterTableFormRef.show()
    }
    const hideAlterTableForm = () => {
        schemaStore.alterTableFormRef.hide()
    }
    const showCreateChildTableForm = () => {
        schemaStore.createChildTableFormRef.show()
    }
    const hideCreateChildTableForm = () => {
        schemaStore.createChildTableFormRef.hide()
    }
    const showAlterChildTableForm = () => {
        schemaStore.alterChildTableFormRef.show()
    }
    const hideAlterChildTableForm = () => {
        schemaStore.alterChildTableFormRef.hide()
    }

    const createDatabase = () => {
        const sql = buildCreateDatabaseSql(schemaStore.databaseStruct.create)
        schemaStore.state.database.creating = true
        httpPost(apis.sql.exec, {
            rawSql: sql
        }).then(res => {
            queryDatabases()
            hideCreateDatabaseForm()
            resetCreateDatabaseForm()
        }).finally(() => {
            schemaStore.state.database.creating = false
        })
    }
    const dropDatabase = (name) => {
        return httpPost(apis.sql.exec, {rawSql: buildDropDatabaseSql(name)})
    }

    const setAlterDatabaseState = (db) => {
        const props = {...db}
        const convert = {
            "keep": propKeepFormat,
            "replica": propToString,
            "walLevel": propToString,
        }
        for (let i in convert) {
            props[i] = convert[i](props[i])
        }
        schemaStore.databaseStruct.alter = {...props}
    }
    const alterDatabase = () => {
        const sql = buildAlterDatabaseSql(schemaStore.databaseStruct.alter)
        schemaStore.state.database.altering = true
        httpPost(apis.sql.exec, {
            rawSql: sql
        }).then(res => {
            queryDatabases()
            hideAlterDatabaseForm()
        }).finally(() => {
            schemaStore.state.database.altering = false
        })
    }
    const propKeepFormat = (v) => {
        const keep = v.split(",")
        const n = keep[0].replace("m", "")
        return n / (60 * 24)
    }
    const propToString = (v) => {
        return String(v)
    }

    const createStable = () => {
        const props = {...schemaStore.stableAndNormalStruct.create}
        props['database'] = databaseStore.currentDatabase.name
        const sql = buildStableCreateSql(props)
        schemaStore.state.table.creating = true
        httpPost(apis.sql.exec, {
            rawSql: sql
        }).then(res => {
            handleTableViewChanged('stable')
            hideCreateTableForm()
            resetCreateTableForm()
        }).finally(() => {
            schemaStore.state.table.creating = false
        })
    }

    const handleOpenAlterStableForm = (table) => {
        setCurrentStable(table.stableName)
        showAlterTableForm()
        Promise.all([queryColumns(), queryTags()]).then((columns, tags) => {
            setAlterStableAndNormalFormState(table, true)
        })
    }
    const setAlterStableAndNormalFormState = (table, stable) => {
        schemaStore.stableAndNormalStruct.alter = {
            database: databaseStore.currentDatabase.name,
            name: stable ? table.stableName : table.tableName,
            comment: table.tableComment,
            columns: schemaStore.alterColumns,
            tags: schemaStore.alterTags,
            ttl: stable ? null : table.ttl,
            origin: {
                comment: table.tableComment,
                ttl: stable ? null : table.ttl
            }
        }
    }
    const alterStable = () => {
        const sql = buildStableAlterSql(schemaStore.stableAndNormalStruct.alter)
        if (!sql) return

        const tasks = []
        sql.forEach(s => {
            tasks.push(() => {
                return new Promise((resolve, reject) => {
                    httpPost(apis.sql.exec, {rawSql: s}).then(res => {
                        setTimeout(resolve, 1000)
                    })
                })
            })
        })
        schemaStore.state.table.altering = true
        const exec = async (success, fail) => {
            for await (let task of tasks) {
                try {
                    await task()
                } catch (e) {
                    fail()
                }
            }
            success()
        }
        exec(() => {
            schemaStore.state.table.altering = false
            queryStables()
            hideAlterTableForm()
        }, () => {
            schemaStore.state.table.altering = false
        })
    }

    const handleOpenCreateChildTableForm = (stable) => {
        showCreateChildTableForm()
        setCurrentStable(stable.stableName)
        queryTags().then(res => {
            schemaStore.childTableStruct.create = {
                stable: stable.stableName,
                tables: [],
                database: databaseStore.currentDatabase.name
            }
            addChildTable()
        })
    }
    const handleOpenAlterChildTableForm = (childTable) => {
        showAlterChildTableForm()
        setTableMode("childTable")
        setCurrentChildTable(childTable.tableName)
        queryTags().then(res => {
            schemaStore.childTableStruct.alter = {table: {...childTable}, tags: _.cloneDeep(schemaStore.childTableTags)}
        })
    }

    const addChildTable = () => {
        schemaStore.childTableStruct.create.tables.push({
            ifNotExists: true,
            id: "tab" + schemaStore.childTableCount,
            name: "New child table " + schemaStore.childTableCount,
            tags: _.cloneDeep(schemaStore.childTableTags)
        })
        schemaStore.childTableCount += 1
    }
    const removeChildTable = (targetKey) => {
        let index = 0
        schemaStore.childTableStruct.create.tables.forEach((tab, i) => {
            if (tab.id === targetKey) {
                index = i
            }
        })
        schemaStore.childTableStruct.create.tables.splice(index, 1)
        let prev = Math.max(0, index - 1)
        schemaStore.selectedChildTable = schemaStore.childTableStruct.create.tables[prev].id
    }

    const createChildTable = () => {
        const sql = buildChildTableCreateSql(schemaStore.childTableStruct.create)
        if (!sql) return
        schemaStore.state.table.creating = true
        httpPost(apis.sql.exec, {
            rawSql: sql
        }).then(res => {
            handleTableViewChanged('stable')
            hideCreateChildTableForm()
            resetCreateChildTableForm()
        }).finally(() => {
            schemaStore.state.table.creating = false
        })
    }
    const alterChildTable = () => {
        const sql = buildChildTableAlterSql(schemaStore.childTableStruct.alter)
        if (sql.length === 0) return

        const tasks = []
        sql.forEach(s => {
            tasks.push(() => {
                return new Promise((resolve, reject) => {
                    httpPost(apis.sql.exec, {rawSql: s}).then(res => {
                        setTimeout(resolve, 1000)
                    }).catch(reject)
                })
            })
        })
        schemaStore.state.table.altering = true
        const exec = async (success, fail) => {
            for await (let task of tasks) {
                try {
                    await task()
                } catch (e) {
                    fail()
                }
            }
            success()
        }
        exec(() => {
            schemaStore.state.table.altering = false
            handleTableViewChanged('childAndNormalTable')
            hideAlterChildTableForm()
            resetAlterChildTableForm()
        }, () => {
            schemaStore.state.table.altering = false
        })
    }
    const createNormalTable = () => {
        const props = {...schemaStore.stableAndNormalStruct.create}
        props['database'] = databaseStore.currentDatabase.name
        const sql = buildNormalTableCreateSql(props)
        schemaStore.state.table.creating = true
        httpPost(apis.sql.exec, {
            rawSql: sql
        }).then(res => {
            handleTableViewChanged('childAndNormalTable')
            hideCreateTableForm()
            resetCreateTableForm()
        }).finally(() => {
            schemaStore.state.table.creating = false
        })
    }
    const handleOpenAlterNormalTableForm = (table) => {
        setTableMode(typeDefine.table.NORMAL_TABLE)
        setCurrentNormalTable(table.tableName)
        showAlterTableForm()
        Promise.all([queryColumns()]).then((columns, tags) => {
            setAlterStableAndNormalFormState(table, false)
        })
    }
    const alterNormalTable = () => {
        const sql = buildNormalTableAlterSql(schemaStore.stableAndNormalStruct.alter)
        if (!sql) return

        const tasks = []
        sql.forEach(s => {
            tasks.push(() => {
                return new Promise((resolve, reject) => {
                    httpPost(apis.sql.exec, {rawSql: s}).then(res => {
                        setTimeout(resolve, 1000)
                    }, reject)
                })
            })
        })
        schemaStore.state.table.altering = true
        const exec = async (success, fail) => {
            for await (let task of tasks) {
                try {
                    await task()
                } catch (e) {
                    fail()
                }
            }
            success()
        }
        exec(() => {
            schemaStore.state.table.altering = false
            queryChildAndNormalTables()
            hideAlterTableForm()
        }, () => {
            schemaStore.state.table.altering = false
        })
    }

    const dropTable = (table) => {
        let sql = null
        let refresh = () => { }
        if (table.type === "CHILD_TABLE" || table.type === "NORMAL_TABLE") {
            sql = buildDropTableSql('child', table.dbName, table.tableName)
            refresh = queryChildAndNormalTables
        } else {
            sql = buildDropTableSql('stable', table.dbName, table.stableName)
            refresh = queryStables
        }
        Modal.confirm({
            title: i18n.global.t("ui.label.deleteTable"),
            icon: createVNode(ExclamationCircleOutlined),
            content: i18n.global.t("ui.tips.deleteTable", [table.tableName || table.stableName]),
            onOk() {
                return new Promise((resolve, reject) => {
                    httpPost(apis.sql.exec, {rawSql: sql}).then(() => {
                        refresh()
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

    const handleTableViewChanged = (type) => {
        setTableMode(type)
        switch (type) {
            case "stable":
                queryStables()
                break;
            case "childAndNormalTable":
                queryChildAndNormalTables()
                break;
        }
    }
    const setSearchKeyword = (keyword) => {
        tableStore.filter.childAndNormalKeyword = keyword
        tableStore.filter.stableKeyword = keyword
    }
    const gotoTablesViewWithSearch = (keyword) => {
        tableStore.filter.childAndNormalKeyword = `stable:${keyword}`
        schemaStore.tableSearchKeyword = `stable:${keyword}`
        schemaStore.tableView = "childAndNormalTable"
        handleTableViewChanged('childAndNormalTable')
    }

    const resetSchemaState = () => {
        resetCreateDatabaseForm()
    }
    const resetCreateDatabaseForm = () => {
        schemaStore.databaseStruct.create = {...sqlConfig.schema.database.create}
    }
    const resetCreateTableForm = () => {
        schemaStore.stableAndNormalStruct.create = {...sqlConfig.schema.stable.create}
        schemaStore.stableAndNormalStruct.create.columns = [{
            _key: Date.now(),
            name: null,
            type: "FLOAT",
            length: null
        }]
        schemaStore.stableAndNormalStruct.create.tags = [{
            _key: Date.now(),
            name: null,
            type: "NCHAR",
            length: 4
        }]
    }
    const resetCreateChildTableForm = () => {
        schemaStore.childTableStruct.create = {tables: [], stable: null}
        schemaStore.childTableCount = 1
    }
    const resetAlterChildTableForm = () => {
        schemaStore.childTableStruct.alter = {table: {}, tags: []}
    }

    const registerListener = () => {
        watch(instanceReady, () => {
            if (!instanceReady.value) return
            queryDatabases()
        }, {immediate: true})
        watch(databaseInQuery, (n) => {
            schemaStore.currentDatabase = n
            setCurrentDatabase(schemaStore.currentDatabase)
            queryStables()
            queryChildAndNormalTables()
        })
    }

    onMounted(() => {
        if (route.query.dbName) {
            schemaStore.currentDatabase = route.query.dbName
            setCurrentDatabase(route.query.dbName)
        }
    })
    onBeforeUnmount(() => {
        resetCreateChildTableForm()
        resetAlterChildTableForm()
        resetSchemaState()
        resetCreateDatabaseForm()
        resetCreateTableForm()
    })
    return {
        registerListener,
        createDatabase,
        resetSchemaState,
        resetCreateChildTableForm,
        dropDatabase,
        setAlterDatabaseState,
        alterDatabase,
        createStable,
        alterStable,
        createChildTable,
        alterChildTable,
        createNormalTable,
        alterNormalTable,
        dropTable,

        showCreateDatabaseForm,
        handleTableViewChanged,
        showCreateTableForm,
        hideCreateTableForm,
        handleOpenAlterStableForm,
        handleOpenAlterNormalTableForm,
        handleOpenCreateChildTableForm,
        handleOpenAlterChildTableForm,
        addChildTable,
        removeChildTable,
        showAlterChildTableForm,
        hideAlterChildTableForm,

        setSearchKeyword,
        gotoTablesViewWithSearch
    }
}
