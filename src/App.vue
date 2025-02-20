<script setup>
import HeaderComponent from "./components/Header.vue";
</script>

<template>
  <div class="container">
    <HeaderComponent />
    <router-view />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: white;
  height: 100vh;
  width: 100vw;
}
</style>
