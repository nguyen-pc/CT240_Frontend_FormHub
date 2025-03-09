<script setup>
import HeaderComponent from "./components/Header.vue";
import ProjectDialog from "./components/ProjectDialog.vue";
</script>

<!-- <template>
  <div class="container">
    <HeaderComponent v-if="!$route.meta.hideHeader" />
    <router-view />
    <ProjectDialog/>
  </div>
</template> -->

<template>
  <div class="container">
    <HeaderComponent v-if="!$route.meta.hideHeader" />
    <router-view />
    <ProjectDialog />

    <!-- Nút để thử truy cập trang cảm ơn -->
    <button @click="$router.push('/thank-you')" class="thank-you-btn">
      Xem trang cảm ơn
    </button>
  </div>
</template>

<!-- <style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background: white;
  height: 100vh;
  width: 100vw;
}
</style> -->

<style scoped>
.thank-you-btn {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.thank-you-btn:hover {
  background-color: #45a049;
}
</style>
