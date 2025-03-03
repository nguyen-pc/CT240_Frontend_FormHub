<template>
  <div class="project-detail">
    <div class="content-wrapper">
      <div class="sidebar">
        <div class="sidebar-header">
          <h2>Projects 1</h2>
        </div>
        <div class="sidebar-menu">
          <button class="active">📋 Phiếu khảo sát</button>
          <router-link to="/main/project/file">
            <button>📁 Tài liệu</button>
          </router-link>
        </div>
      </div>

      <div class="main-content">
        <div class="action-bar">
          <div class="search-container">
            <input type="text" placeholder="Nhập phiếu khảo sát cần tìm" />
            <button class="btn">
              <i class="fas fa-search"></i>
            </button>
            <button @click="openProjectDialog" class="btn">+ Thêm khảo sát</button>
          </div>
          <select class="sort-select">
            <option>A - Z</option>
            <option>Z - A</option>
          </select>
        </div>

        <div class="survey-board">
          <h3 class="board-title">Danh sách phiếu khảo sát ({{ surveys.length }})</h3>
          <div class="survey-grid">
            <div v-for="survey in surveys" :key="survey.id" class="survey-card">
              <router-link
                :to="`/main/project/${route.params.id}/survey/${survey.surveyId}`"
              >
                <div class="card-header">
                  <h4>{{ survey.surveyName }}</h4>
                  <div class="card-actions">
                    <button class="icon-btn">⋮</button>
                  </div>
                </div>
                <div class="card-stats">
                  <span>📩 {{ survey.responses.length }} phản hồi</span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { useDialogStore, useFormStore } from "../stores/store";
import { computed, onMounted } from "vue";
import { SurveyStore } from "@/stores/survey";

const useSurveyStore = SurveyStore();
const router = useRouter();
const route = useRoute();

const dialogStore = useDialogStore();
const param = route.params.id;
console.log(route.params.id);

const openProjectDialog = async () => {
  dialogStore.openDialog("khảo sát", { name: "", description: "" });
  await fetchSurvey();
};

const fetchSurvey = async () => {
  try {
    await useSurveyStore.getAllSurvey(param);
  } catch (e) {
    console.log(e);
  }
};

onMounted(fetchSurvey); // const projectStore = useProjectStore();
const surveys = computed(() => useSurveyStore.surveys);
console.log("All survey", surveys);
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.project-details {
  height: 100vh;
  /* Full height of the viewport */
  width: 100vw;
  /* Full width of the viewport */
  display: flex;
  flex-direction: column;
  /* background: linear-gradient(to right, #6a11cb, #2575fc); */
  /* Gradient background */
  font-family: "Segoe UI", sans-serif;
  overflow: auto;
  /* Enable scrolling if content overflows */
  margin: 0;
  /* Remove default margin */
  padding: 0;
  /* Remove default padding */
}

/* Header */
.header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #e0e0e0;
  background-color: brown;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.breadcrumb {
  margin-top: 20px;
  padding: 12px 2rem;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
  padding: 10px;
  border-radius: 14px;
  /* Changed to solid white */
  color: #333;
}

/* Content area */
.content-wrapper {
  border-radius: 10px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  flex: 1;
  display: flex;
  padding: 16px;
  height: 80vh;
}

/* Sidebar */
.sidebar {
  width: 25%;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 12px;
}

.sidebar-header {
}

.sidebar-header h2 {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 16px;
  color: #6a11cb;
}

.sidebar-menu button {
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: none;
  border-radius: 8px;
  background: #f0f2f5;
  /* Updated for consistency */
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}

.sidebar-menu button.active {
  background: #6a11cb;
  color: white;
  font-weight: 500;
}

/* Main content */
.main-content {
  flex: 1;
  background: #ffffff;
  margin: 0 0 0 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.action-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.search-container {
  flex: 1;
  display: flex;
  gap: 1rem;
  max-width: 500px;
}

.search-container input {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
}

.search-btn {
  background: #7122e8;
  color: rgb(167, 36, 237);
  padding: 0.8rem 1.5rem;
  /* More padding */
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.sort-select {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  background: white;
  gap: 4px;
}

.btn {
  padding: 8px 12px;
  background: #9c11cb;
  color: rgb(234, 224, 224);
  border: none;
  border-radius: 8px;
  margin-left: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.survey-board {
  margin-top: 1.5rem;
}

.board-title {
  color: #333;
  margin-bottom: 1.5rem;
}

/* Survey grid */
.survey-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  min-height: 0;
  overflow: auto;
  padding: 4px;
}

.survey-card {
  text-decoration: none;
  background: #ffffff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.survey-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-actions {
  display: flex;
}

.card-header h4 {
  margin: 0;
  color: #333;
}

.icon-btn {
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  color: #666;
  padding: 4px;
}

.card-stats {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 0.9em;
}
</style>
