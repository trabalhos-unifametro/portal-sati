<script lang="ts">
import {RouterLink} from "vue-router";
import {defineComponent} from 'vue'

export default defineComponent({
  name: "Index",
  components: {
    RouterLink
  }
})

</script>

<template>
  <main>
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/auth/login">Login</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </main>
</template>