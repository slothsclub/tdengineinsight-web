<script setup>

import PageTitle from "../components/PageTitle.vue";
import InstanceSelector from "../components/InstanceSelector.vue";
import Logo from "../components/Logo.vue";
import Menu from "../components/Menu.vue";
import Separator from "../components/Separator.vue";
import About from "../components/About.vue";
</script>

<template>
  <a-layout>
    <a-layout-header class="header">
      <a-row>
        <a-col class="logo-container">
          <Logo class=""></Logo>
        </a-col>
        <a-col class="dropdown-container flex-grow">
          <InstanceSelector />
          <Separator />
          <PageTitle></PageTitle>
        </a-col>
        <a-col>
          <About />
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" class="sider">
        <Menu></Menu>
      </a-layout-sider>
      <a-layout style="margin-left: 200px;margin-top: 64px">
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style scoped>

</style>