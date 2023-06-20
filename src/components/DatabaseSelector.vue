<template>
  <a-dropdown>
    <a class="ant-dropdown-link" @click.prevent>
      localhost
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu class="database-dropdown-item">
        <a-menu-item key="0">
          {{ $t('ui.label.allDatabase') }}
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3">localhost</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script>
import { defineComponent } from 'vue';
import { DownOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    DownOutlined,
  },
});
</script>