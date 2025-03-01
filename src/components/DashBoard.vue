<template>
  <div class="dashboard">
    <div class="board-header">
      <div class="search-bar">
        <input type="text" style="color: black" placeholder="Nhập dự án cần tìm" />
        <button class="btn">A-Z</button>
      </div>
      <div class="add-project">
        <button @click="openProjectDialog" class="btn">+ Dự án mới</button>
      </div>
    </div>
    <table class="project-table">
      <thead>
        <tr>
          <th></th>
          <th>Dự án</th>
          <th>Phiếu khảo sát</th>
          <th>Sửa đổi</th>
          <th>Chủ sở hữu</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr class="project-row" v-for="(project, index) in projects" :key="index">
          <td>
            <div class="dot"></div>
          </td>
          <td class="project-name">
            <router-link :to="`/main/project/${project.projectId}`" class="project-name">
              {{ project.projectName }}
            </router-link>
            <!-- {{ project.projectName }} -->
          </td>
          <td>{{ project.surveys.length }}</td>
          <td>{{ project.createdAt }}</td>
          <td>{{ project.createdBy }}</td>
          <td>...</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ProjectStore } from "@/stores/project";
import { useDialogStore } from "../stores/store";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
const dialogStore = useDialogStore();
const useProjectStore = ProjectStore();
const router = useRouter();
const route = useRoute();

const openProjectDialog = async () => {
  dialogStore.openDialog("dự án", { name: "", description: "" });

  await fetchProjects(); // Gọi lại API để cập nhật danh sách
};

const fetchProjects = async () => {
  try {
    await useProjectStore.getAllProjects();
  } catch (e) {
    console.log(e);
  }
};

onMounted(fetchProjects); // const projectStore = useProjectStore();
const projects = computed(() => useProjectStore.projects);
console.log("All project", projects);

const projectID = (projectId) => {
  router.push({ name: "project", params: { id: projectId } });
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
  border-radius: 10px;
  width: 100%;
}
.board-header {
  display: flex;
  margin-bottom: 15px;
}
.search-bar {
  display: flex;
  margin: auto;
  gap: 30px;
  font-size: 20px;
}

.add-project {
  gap: 5px;
  font-size: 30px;
}

.search-bar input {
  padding: 8px;
  border-radius: 10px;
  width: 500px;
}

.btn {
  padding: 10px;
  background: white;
  color: black;
  border: none;
  border-radius: 10px;
}

.project-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  font-size: 22px;
}

.project-table th,
.project-table td {
  padding: 10px;
  border-bottom: 1px solid white;
}
.project-name {
  text-decoration: none;
  color: white;
}

.project-name:hover {
  color: pink;
  cursor: pointer;
}

.dot {
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
}
</style>
