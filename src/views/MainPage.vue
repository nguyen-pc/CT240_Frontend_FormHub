<template>
  <div class="container">
    <HeaderComponent />
    <div class="content">
      <DashboardComponent />
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/Header.vue";
import DashboardComponent from "../components/Dashboard.vue";

export default {
    name: "MainPage",
  components: {
    HeaderComponent,
    DashboardComponent,
  },
};
</script>

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
.content {
  display: flex;
  flex: 1;
  width: 100%;
}

</style>
