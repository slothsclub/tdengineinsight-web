<script setup>
import {DeleteOutlined} from "@ant-design/icons-vue";
const emit = defineEmits(["selected", "delete"])
const props = defineProps({
  col: {
    type: Number,
    default() {return 6}
  }
})

</script>

<template>
  <a-col :span="col" class="subscription-card">
    <div class="consumer-id">
      1564896548975648
    </div>
    <a-card @click="emit('selected')">
      <div class="group-name">Group name</div>
      <div class="group-id">Group id: 22345-32-324</div>
    </a-card>
    <div class="actions">
      <a-space>
        <a-button shape="circle" size="small" danger @click="emit('delete')">
          <template #icon>
            <DeleteOutlined />
          </template>
        </a-button>
      </a-space>
    </div>
  </a-col>
</template>

<style scoped>

</style>
