<template>
  <div class="content">
    <DashboardComponent />
  </div>
</template>

<script>
import DashboardComponent from "../components/Dashboard.vue";

export default {
  name: "MainPage",
  components: {
    DashboardComponent
  }
};
</script>

<style scoped>
.content {
  display: flex;
  flex: 1;
  width: 100%;
}
</style>
