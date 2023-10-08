<script setup>
import {ref} from "vue";
import {useColumnStore} from "../../store/column.js";
import {useQueryBuilderStore} from "../../store/query-builder.js";
import {InfoCircleOutlined} from "@ant-design/icons-vue";
import {sqlConfig} from "../../config/sql-config.js";

const columnStore = useColumnStore()
const queryBuilderStore = useQueryBuilderStore()
const {windowClause} = queryBuilderStore
</script>

<template>
    <a-row :gutter="[0, 20]" class="window-clause-container">
        <a-col :span="24">
            <a-space class="">
                <a-input-group compact>
                    <a-button disabled>{{ $t('common.type') }}</a-button>
                    <a-select v-model:value="windowClause.type">
                        <a-select-option value="none">{{ $t('common.none') }}</a-select-option>
                        <a-select-option value="interval">{{ $t('tdengine.keywords.INTERVAL') }}</a-select-option>
                        <a-select-option value="state">{{ $t('tdengine.keywords.STATE_WINDOW') }}</a-select-option>
                        <a-select-option value="session">{{ $t('tdengine.keywords.SESSION') }}</a-select-option>
                    </a-select>
                </a-input-group>

                <a-input-group compact v-if="windowClause.type === 'interval'">
                    <a-button disabled>{{ $t('common.interval') }}</a-button>
                    <a-input-number v-model:value="windowClause.interval" placeholder=""/>
                    <a-select v-model:value="windowClause.intervalUnit">
                        <a-select-option value="s">{{ $t('common.seconds') }}</a-select-option>
                        <a-select-option value="m">{{ $t('common.minutes') }}</a-select-option>
                        <a-select-option value="h">{{ $t('common.hours') }}</a-select-option>
                    </a-select>
                </a-input-group>
                <a-input-group compact v-if="windowClause.type === 'interval'">
                    <a-button disabled>{{ $t('common.offset') }}</a-button>
                    <a-input-number v-model:value="windowClause.intervalOffset" :min="0" placeholder=""/>
                    <a-select v-model:value="windowClause.intervalOffsetUnit" v-show="windowClause.intervalOffset != null">
                        <a-select-option value="a">{{ $t('common.millisecond') }}</a-select-option>
                        <a-select-option value="s">{{ $t('common.seconds') }}</a-select-option>
                        <a-select-option value="m">{{ $t('common.minutes') }}</a-select-option>
                        <a-select-option value="h">{{ $t('common.hours') }}</a-select-option>
                    </a-select>
                </a-input-group>

                <a-input-group compact v-if="windowClause.type === 'interval'">
                    <a-button disabled>{{ $t('common.mode') }}</a-button>
                    <a-select v-model:value="windowClause.intervalMode">
                        <a-select-option value="fill">{{ $t('tdengine.keywords.FILL') }}</a-select-option>
                        <a-select-option value="sliding">{{ $t('tdengine.keywords.SLIDING') }}</a-select-option>
                    </a-select>
                    <a-select v-model:value="windowClause.fillMode" v-if="windowClause.intervalMode === 'fill'">
                        <a-select-option value="none">{{ $t('common.none') }}</a-select-option>
                        <a-select-option value="value">{{ $t('tdengine.keywords.VALUE') }}</a-select-option>
                        <a-select-option value="prev">{{ $t('tdengine.keywords.PREV') }}</a-select-option>
                        <a-select-option value="null">{{ $t('tdengine.keywords.NULL') }}</a-select-option>
                        <a-select-option value="linear">{{ $t('tdengine.keywords.LINEAR') }}</a-select-option>
                        <a-select-option value="next">{{ $t('tdengine.keywords.NEXT') }}</a-select-option>
                        <a-select-option value="null_f">{{ $t('tdengine.keywords.NULL_F') }}</a-select-option>
                        <a-select-option value="value_f">{{ $t('tdengine.keywords.VALUE_F') }}</a-select-option>
                    </a-select>

                    <a-input-number v-model:value="windowClause.slidingVal" placeholder=""
                                    v-if="windowClause.intervalMode === 'sliding'"/>
                    <a-select v-model:value="windowClause.slidingValUnit"
                              v-if="windowClause.intervalMode === 'sliding'">
                        <a-select-option value="s">{{ $t('common.seconds') }}</a-select-option>
                        <a-select-option value="m">{{ $t('common.minutes') }}</a-select-option>
                        <a-select-option value="h">{{ $t('common.hours') }}</a-select-option>
                    </a-select>
                </a-input-group>

                <a-input-group compact v-if="windowClause.type === 'state'">
                    <a-button disabled>{{ $t('common.column') }}</a-button>
                    <a-select v-model:value="windowClause.stateColumn">
                        <a-select-option :value="col.colName" v-for="col in columnStore.filteredColumns"
                                         :disabled="col.colName === 'ts' || !sqlConfig.availableDataTypeInWindowStateQueryClause.includes(col.colType)">
                            {{ col.colName }}
                        </a-select-option>
                    </a-select>
                </a-input-group>
                <a-input-group v-if="windowClause.type === 'state'">
                    <a-tooltip>
                        <template #title>{{ $t('ui.tips.stateWindowSupportColumnType') }}</template>
                        <InfoCircleOutlined/>
                    </a-tooltip>
                </a-input-group>

                <a-input-group compact v-if="windowClause.type === 'session'">
                    <a-button disabled>{{ $t('common.time') }}</a-button>
                    <a-input-number v-model:value="windowClause.sessionTime" placeholder=""/>
                    <a-select v-model:value="windowClause.sessionTimeUnit">
                        <a-select-option value="s">{{ $t('common.seconds') }}</a-select-option>
                        <a-select-option value="m">{{ $t('common.minutes') }}</a-select-option>
                        <a-select-option value="h">{{ $t('common.hours') }}</a-select-option>
                    </a-select>
                </a-input-group>
            </a-space>
        </a-col>
        <a-col :span="24" v-show="queryBuilderStore.filledValuesVisible">
            <b>{{ $t('common.filledValue') }}</b><br/>
            <a-space>
                <a-input-group compact v-for="col in queryBuilderStore.windowClause.filledValueColumn">
                    <a-button disabled>{{ col.name }}</a-button>
                    <a-input v-model:value="col.fillValue" placeholder="12.3"/>
                </a-input-group>
            </a-space>
        </a-col>
    </a-row>
</template>

<style scoped>
.ant-select {
    min-width: 150px;
}

.ant-input-group-compact {
    display: flex;
}

.window-clause-container {
    width: 1200px;
}
</style>
