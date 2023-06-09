<template>
  <a-card class="instance-card" hoverable>
    <template #actions>
      <setting-outlined key="setting" />
      <edit-outlined key="edit" />
    </template>
    <a-card-meta title="Localost" description="127.0.0.1:6030" @click="openInstance">

    </a-card-meta>
  </a-card>
</template>
<script>
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
  },

  methods: {
    openInstance() {
      this.$router.push({name: "overview", params: {id: 1}})
    }
  }
});
</script>