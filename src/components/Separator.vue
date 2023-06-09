<script setup>
const props = defineProps({
  size: String
})
</script>

<template>
  <span class="separator" :class="props.size"></span>
</template>

<style lang="less">
.separator {
  margin: 0 20px;
  width: 1px;
  height: 40px;
  background-color: #fff;
  border: solid 1px #ebebeb;
  &.large {
    height: 60px;
  }
  &.small {
    height: 20px;
  }
}
</style>
