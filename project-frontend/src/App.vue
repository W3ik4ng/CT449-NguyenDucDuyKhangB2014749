<script>
import AppHeader from '@/components/AppHeader.vue'
export default {
  components: {
    AppHeader,
  }
}
</script>

<template>
  <AppHeader />
  <router-view/>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
