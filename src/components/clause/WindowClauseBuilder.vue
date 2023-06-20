<script setup>

import {ref} from "vue";

const type = ref("interval")
const interval = ref("1")
const unit = ref("s")
const intervalMode = ref("fill")
const fillVal = ref("none")
const slidingVal = ref("1")
const slidingValUnit = ref("s")
const stateColumn = ref("col1")
const sessionTime = ref("10")
const sessionTimeUnit = ref("s")
</script>

<template>
<a-space>
  <a-input-group compact>
    <a-button disabled>{{ $t('common.type') }}</a-button>
    <a-select v-model:value="type">
      <a-select-option value="">{{ $t('common.none') }}</a-select-option>
      <a-select-option value="interval">{{ $t('tdengine.keywords.INTERVAL') }}</a-select-option>
      <a-select-option value="state">{{ $t('tdengine.keywords.STATE_WINDOW') }}</a-select-option>
      <a-select-option value="session">{{ $t('tdengine.keywords.SESSION') }}</a-select-option>
    </a-select>
  </a-input-group>

  <a-input-group compact v-if="type === 'interval'">
    <a-button disabled>{{$t('common.interval')}}</a-button>
    <a-input-number v-model:value="interval" placeholder="" />
    <a-select v-model:value="unit">
      <a-select-option value="s">{{ $t('common.seconds') }}</a-select-option>
      <a-select-option value="m">{{ $t('common.minutes') }}</a-select-option>
      <a-select-option value="h">{{ $t('common.hours') }}</a-select-option>
    </a-select>
  </a-input-group>

  <a-input-group compact v-if="type === 'interval'">
    <a-button disabled>{{ $t('common.mode') }}</a-button>
    <a-select v-model:value="intervalMode">
      <a-select-option value="fill">{{ $t('tdengine.keywords.FILL') }}</a-select-option>
      <a-select-option value="sliding">{{ $t('tdengine.keywords.SLIDING') }}</a-select-option>
    </a-select>
    <a-select v-model:value="fillVal" v-if="intervalMode === 'fill'">
      <a-select-option value="none">{{ $t('common.none') }}</a-select-option>
      <a-select-option value="value">{{ $t('tdengine.keywords.VALUE') }}</a-select-option>
      <a-select-option value="prev">{{ $t('tdengine.keywords.PREV') }}</a-select-option>
      <a-select-option value="null">{{ $t('tdengine.keywords.NULL') }}</a-select-option>
      <a-select-option value="linear">{{ $t('tdengine.keywords.LINEAR') }}</a-select-option>
      <a-select-option value="next">{{ $t('tdengine.keywords.NEXT') }}</a-select-option>
    </a-select>

    <a-input-number v-model:value="slidingVal" placeholder="" v-if="intervalMode === 'sliding'" />
    <a-select v-model:value="slidingValUnit" v-if="intervalMode === 'sliding'">
      <a-select-option value="s">{{ $t('common.seconds') }}</a-select-option>
      <a-select-option value="m">{{ $t('common.minutes') }}</a-select-option>
      <a-select-option value="h">{{ $t('common.hours') }}</a-select-option>
    </a-select>
  </a-input-group>

  <a-input-group compact v-if="type === 'state'">
    <a-button disabled>{{ $t('common.column') }}</a-button>
    <a-select v-model:value="stateColumn">
      <a-select-option value="col1">Col 1</a-select-option>
      <a-select-option value="col2">Col 2</a-select-option>
      <a-select-option value="col3">Col 3</a-select-option>
    </a-select>
  </a-input-group>

  <a-input-group compact v-if="type === 'session'">
    <a-button disabled>{{ $t('common.time') }}</a-button>
    <a-input-number v-model:value="sessionTime" placeholder="" />
    <a-select v-model:value="sessionTimeUnit">
      <a-select-option value="s">{{ $t('common.seconds') }}</a-select-option>
      <a-select-option value="m">{{ $t('common.minutes') }}</a-select-option>
      <a-select-option value="h">{{ $t('common.hours') }}</a-select-option>
    </a-select>
  </a-input-group>
</a-space>
</template>

<style scoped>
.ant-select {
  min-width: 150px;
}
.ant-input-group-compact {
  display: flex;
}
</style>