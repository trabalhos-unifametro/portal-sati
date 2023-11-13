<script lang="ts">
import {defineComponent} from 'vue'
import { Tooltip } from 'bootstrap'
import LeftSidebar from "@/components/base/LeftSidebar.vue";
import TopBar from "@/components/base/TopBar.vue";
import FooterKrl from "@/components/base/Footer.vue";

export default defineComponent({
  components: {
    LeftSidebar,
    TopBar,
    FooterKrl
  },
  data: () => ({
    closeLeftSidebar: false,
  }),
  mounted() {
    new Tooltip(document.body, {
      selector: "[data-bs-toggle='tooltip']",
    })
  }
})

</script>

<template>
  <div class="layout-app" :class="{ 'closed-left-sidebar': closeLeftSidebar }">
    <LeftSidebar v-model="closeLeftSidebar"/>
    <TopBar/>
    <div class="app">
      <div class="content-app">
        <RouterView />
      </div>
      <FooterKrl/>
    </div>
  </div>
</template>

<style lang="scss">
@import url('../../assets/stylesheets/layout-app.scss');
</style>