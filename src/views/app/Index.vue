<script lang="ts">
import {defineComponent} from 'vue'
import { Tooltip } from 'bootstrap'
import LeftSidebar from "@/components/base/LeftSidebar.vue";
import TopBar from "@/components/base/TopBar.vue";
import FooterTemplate from "@/components/base/Footer.vue";
import { Loading } from "@/stores/loading";
import Card from "@/components/Card.vue";

export default defineComponent({
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Card,
    LeftSidebar,
    TopBar,
    FooterTemplate
  },
  data: () => ({
    closeLeftSidebar: false,
    load: Loading()
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
      <div class="content-app" :class="{ 'loading': load.loading }">
        <div class="loading-full-screen text-white">
          <div class="spinner-border" style="width: 5rem; height: 5rem;" role="status"></div>
        </div>
        <RouterView />
      </div>
      <FooterTemplate/>
    </div>
  </div>
</template>

<style lang="scss">
@import url('../../assets/stylesheets/layout-app.scss');
</style>