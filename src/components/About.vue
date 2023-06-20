<script setup>
import {MoreOutlined, SettingOutlined, QuestionCircleOutlined, InfoCircleOutlined} from "@ant-design/icons-vue"
</script>

<template>
  <a-dropdown class="about-links">
    <div>
      <MoreOutlined />
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <SettingOutlined />
          {{ $tc('common.setting', 2) }}
        </a-menu-item>
        <a-menu-item key="0">
          <QuestionCircleOutlined />
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/slothsclub/TDengineInsight/issues">
            {{ $t('common.feedback') }}
          </a>
        </a-menu-item>
        <a-menu-item key="1">
          <InfoCircleOutlined />
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/slothsclub/TDengineInsight">
            {{ $t('common.about') }}
          </a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<style scoped>

</style>