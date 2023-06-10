<script setup>

import PageTitle from "../components/PageTitle.vue";
import DatabaseSelector from "../components/DatabaseSelector.vue";
import Logo from "../components/Logo.vue";
import Menu from "../components/Menu.vue";
import Separator from "../components/Separator.vue";
</script>

<template>
  <a-layout>
    <a-layout-header class="header">
      <a-row>
        <a-col class="logo-container">
          <Logo class=""></Logo>
        </a-col>
        <a-col class="dropdown-container">
          <DatabaseSelector />
          <Separator />
          <PageTitle></PageTitle>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout class="main-container">
      <a-layout-sider width="200" class="sider">
        <Menu></Menu>
      </a-layout-sider>
      <a-layout style="">
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style scoped>

</style>