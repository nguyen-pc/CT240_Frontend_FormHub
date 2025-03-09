<template>
  <div class="dashboard">
    <div class="board-header">
      <div class="search-bar">
        <input
          type="text"
          style="color: black"
          placeholder="Nhập dự án cần tìm"
          v-model="searchQuery"
        />
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
        <tr class="project-row" v-for="(project, index) in filteredItems" :key="index">
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
          <td>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="outline">...</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-40">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <span
                      @click="
                        openProjectDialogEdit(
                          project.projectId,
                          project.projectName,
                          project.description
                        )
                      "
                      class="cursor-pointer hover:text-yellow-600"
                      >Sửa thông tin</span
                    >
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span
                      class="cursor-pointer hover:text-yellow-600"
                      @click="deleteProject(project.projectId)"
                      >Xóa dự án</span
                    >
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ProjectStore } from "@/stores/project";
import { useDialogStore, useDialogStoreEdit } from "../stores/store";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/toast/use-toast";
import { h } from "vue";
import { toast, type ToastOptions } from "vue3-toastify";
import { format } from "date-fns";

const dialogStore = useDialogStore();
const dialogStoreEdit = useDialogStoreEdit();
const useProjectStore = ProjectStore();

const searchQuery = ref("");
const router = useRouter();
const route = useRoute();
let projectData = ref([]);

const openProjectDialog = async () => {

  await dialogStore.openDialog("dự án", { name: "", description: "" }, async () => {
    try {
      await fetchProjects();
    } catch (error) {
      console.error("Lỗi khi fetch dự án:", error);
    }

  });
};


// const fetchProjects = async () => {
//   try {
//      await useProjectStore.getAllProjects();
//   } catch (e) {
//     console.log(e);
//   }
// };
const fetchProjects = async () => {
  try {
    const projects = await useProjectStore.getAllProjects();
    projectData.value = projects.map((project) => ({
      ...project,
      createdAt: format(new Date(project.createdAt), "yyyy-MM-dd HH:mm:ss"),
    }));
    console.log("Danh sách dự án đã cập nhật:", projectData.value);
  } catch (e) {
    console.error("Lỗi khi fetch dự án:", e);
  }
};

onMounted(fetchProjects); // const projectStore = useProjectStore();
const projects = computed(() => useProjectStore.projects);


const openProjectDialogEdit = async (id, name, description) => {
  console.log(id, name, description);
  await dialogStoreEdit.openDialogEdit("dự án", id, name, description, async () => {
    try {
      await fetchProjects();
    } catch (error) {
      console.error("Lỗi khi fetch dự án:", error);
    }

  });

  await fetchProjects(); // Gọi lại API để cập nhật danh sách
};

const deleteProject = async (projectId) => {
  try {
    await useProjectStore.deleteProject(projectId);

    await fetchProjects();
    toast.success("Xóa dự án thành công!", {
      autoClose: 2000,
      position: toast.POSITION.BOTTOM_RIGHT,
   } as ToastOptions)
  } catch (error) {
    console.error("Lỗi khi xóa dự án:", error);
    toast.error("Lỗi khi xóa dự án!", {
      autoClose: 2000,
      position: toast.POSITION.BOTTOM_RIGHT,
   } as ToastOptions)
  }
};

const projectID = (projectId) => {
  router.push({ name: "project", params: { id: projectId } });
};
// onMounted(async () => {
//   const projects =  await useProjectStore.getAllProjects();
//   // Format lại dữ liệu
//   const formattedProject = projects.map((project) => ({
//     ...project,
//     createdAt: format(new Date(project.createdAt), "yyyy-MM-dd HH:mm:ss"), // Format thời gian
//   }));

//   projectData.value = formattedProject;

//   console.log("Formatted project data", projectData.value);
// });

const filteredItems = computed(() => {

  return projectData.value.filter((item) =>
    item.projectName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});



console.log("filter",filteredItems)
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
