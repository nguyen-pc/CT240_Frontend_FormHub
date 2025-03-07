<script setup>
import HeaderComponent from "./components/Header.vue";
import ProjectDialog from "./components/ProjectDialog.vue";
import ProjectDialogEdit from "./components/ProjectDialogEdit.vue";
</script>

<template>
  <div class="container">
    <HeaderComponent v-if="!$route.meta.hideHeader" />
    <router-view />
    <ProjectDialogEdit />
    <ProjectDialog />
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
