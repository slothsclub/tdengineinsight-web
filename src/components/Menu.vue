<script setup>
import menus from "../config/menu.js";
</script>

<template>
  <a-row class="menu">
    <template v-for="menu in menus">
      <router-link v-if="menu.name" :to="{name: menu.name, params: {id: $route.params.id}}"
                   class="ant-col ant-col-24 menu-item clickable"
                   :class="{'selected': menu.name === $route.name, 'menu-section': menu.type === 'section-item'}">
        {{ $t(menu.label) }}
      </router-link>
      <a-col :span="24" v-if="menu.type === 'hr'">
        <hr>
      </a-col>
      <a-col :span="24" class="menu-item menu-section" v-if="menu.type === 'section'">{{ $t(menu.label) }}</a-col>
    </template>
  </a-row>
</template>

<style scoped>

</style>
