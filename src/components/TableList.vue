<script setup>
const data = [{
  title: 'Table 1',
}, {
  title: 'Table 2',
}, {
  title: 'Table 3',
}, {
  title: 'Table 4',
}]
</script>

<template>
  <a-list item-layout="horizontal" :data-source="data" class="table-list mrg-top">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta
            description="Table description..."
        >
          <template #title>
            {{ item.title }}
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<style scoped>

</style>