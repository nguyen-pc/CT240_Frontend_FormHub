<script setup>
import HeaderComponent from "./components/Header.vue";
import ProjectDialog from "./components/ProjectDialog.vue";
import ProjectDialogEdit from "./components/ProjectDialogEdit.vue";
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>

<template>
  <div class="container">
    <HeaderComponent v-if="!$route.meta.hideHeader" />
    <router-view />
    <ProjectDialogEdit />
    <ProjectDialog />
    <Toaster />
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
