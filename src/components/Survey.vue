<template>
  <div class="project-detail">
    <div class="content-wrapper">
      <div class="sidebar">
        <div class="sidebar-header">
          <h2>{{ projectData.projectName }}</h2>
        </div>
        <div class="sidebar-menu">
          <router-link :to="`/main/project/${param}`">
            <button class="active">📋 Phiếu khảo sát</button>
          </router-link>
          <router-link :to="`/main/project/${param}/file`">
            <button>📁 Tài liệu</button>
          </router-link>
        </div>
      </div>

      <div class="main-content">
        <div class="action-bar">
          <div class="search-container">
            <input
              type="text"
              placeholder="Nhập phiếu khảo sát cần tìm"
              v-model="searchQuery"
            />
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
            <div v-for="survey in filteredItems" :key="survey.id" class="survey-card">
              <div class="card-header">
                <router-link
                  :to="`/main/project/${route.params.id}/survey/${survey.surveyId}`"
                  ><h4>{{ survey.surveyName }}</h4>
                </router-link>
                <div class="card-actions">
                  <button class="icon-btn">
                    <DropdownMenu>
                      <DropdownMenuTrigger as-child>
                        <Button variant="outline">...</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent class="w-40">
                        <DropdownMenuGroup>
                          <DropdownMenuItem class="cursor-pointer">
                            <span
                              @click="
                                openProjectDialogEdit(
                                  survey.surveyId,
                                  survey.surveyName,
                                  survey.description
                                )
                              "
                              class="cursor-pointer hover:text-yellow-600"
                              >Sửa thông tin</span
                            >
                          </DropdownMenuItem>
                          <DropdownMenuItem class="mt-2 cursor-pointer">
                            <span
                              class="cursor-pointer hover:text-yellow-600"
                              @click="deleteSurvey(param, survey.surveyId)"
                              >Xóa dự án</span
                            >
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </button>
                </div>
              </div>
              <div class="card-stats">
                <span>📩 {{ survey.responses.length }} phản hồi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { useDialogStore, useDialogStoreEdit, useFormStore } from "../stores/store";
import { computed, onMounted, ref } from "vue";
import { SurveyStore } from "@/stores/survey";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProjectStore } from "@/stores/project";
import { format } from "date-fns";
const useSurveyStore = SurveyStore();
const useProjectStore = ProjectStore();
const router = useRouter();
const route = useRoute();

const dialogStore = useDialogStore();
const dialogStoreEdit = useDialogStoreEdit();
const param = route.params.id;
const projectData = ref({});
const surveyData = ref([]);
const searchQuery = ref("");

console.log(route.params.id);

const openProjectDialog = async () => {
  dialogStore.openDialog("khảo sát", { name: "", description: "" }, async () => {
    try {
      await fetchSurvey();
    } catch (error) {
      console.error("Lỗi khi fetch dự án:", error);
    }
  });
};

// const fetchSurvey = async () => {
//   try {
//     await useSurveyStore.getAllSurvey(param);
//   } catch (e) {
//     console.log(e);
//   }
// };

const fetchSurvey = async () => {
  try {
    const surveys = await useSurveyStore.getAllSurvey(param);

    surveyData.value = surveys.map((survey) => ({
      ...survey,
      createdAt: format(new Date(survey.createdAt), "yyyy-MM-dd HH:mm:ss"),
    }));
    console.log("Danh sách dự án đã cập nhật:", surveyData.value);
  } catch (e) {
    console.error("Lỗi khi fetch dự án:", e);
  }
};

onMounted(fetchSurvey);
// onMounted(fetchProject); // const projectStore = useProjectStore();
const surveys = computed(() => useSurveyStore.surveys);
// Lưu dữ liệu vào biến phản ứng
// const projectById = computed(() => useProjectStore.project);
// console.log("Project By Id", projectById);
console.log("All survey", surveys);

onMounted(async () => {
  const project = await useProjectStore.getProjectsById(param);
  projectData.value = project;
  console.log("fetch frontend", projectData);
});

const deleteSurvey = async (projectId, surveyId) => {
  await useSurveyStore.deleteSurvey(projectId, surveyId);
  await fetchSurvey();
};

const openProjectDialogEdit = async (id, name, description) => {
  console.log(id, name, description);
  await dialogStoreEdit.openDialogEdit("Khảo sát", id, name, description, async () => {
    try {
      await fetchSurvey();
    } catch (error) {
      console.error("Lỗi khi fetch dự án:", error);
    }
  });
};

const filteredItems = computed(() => {
  console.log(surveyData);
  return surveyData.value.filter((item) =>
    item.surveyName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
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
