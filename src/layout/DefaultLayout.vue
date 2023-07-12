<template>
  <a-layout>
    <a-layout-header class="header">
      <a-row>
        <a-col class="logo-container">
          <Logo class=""></Logo>
        </a-col>
        <a-col class="dropdown-container">
          <PageTitle></PageTitle>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout class="main-container">
      <a-layout style="">
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import Logo from "../components/Logo.vue";
import InstanceSelector from "../components/InstanceSelector.vue";
import PageTitle from "../components/PageTitle.vue";
export default defineComponent({
  components: {
    PageTitle,
    InstanceSelector,
    Logo,
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
  },
  setup() {
    return {
      selectedKeys1: ref(['2']),
      selectedKeys2: ref(['1']),
      collapsed: ref(false),
      openKeys: ref(['sub1']),
    };
  },
});
</script>
<style>

</style>