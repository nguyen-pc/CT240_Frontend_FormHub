<template>
  <div class="dashboard">
    <!-- Header -->

    <!-- Main content -->
    <div class="main-content">
      <!-- Sidebar -->
      <div class="sidebar">
        <h2>{{ projectData.projectName }}</h2>
        <router-link :to="`/main/project/${param}`">
          <button class="sidebar-btn">📋 Phiếu khảo sát</button>
        </router-link>
        <button class="sidebar-btn active">📁 Tài liệu</button>
      </div>

      <!-- Content -->
      <div class="content">
        <div class="search-bar">
          <input type="text" placeholder="Nhập tên thư mục/file" v-model="searchQuery" />
          <button class="btn">
            <i class="fas fa-search"></i>
          </button>

          <select class="btn filter-btn" v-model="selectedType">
            <option value="">Tất cả</option>
            <option value="mp4">MP4</option>
            <option value="application/pdf">PDF</option>
            <option
              value="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            >
              Word
            </option>
            <option value="image/jpeg">PNG</option>
          </select>
        </div>

        <div class="actions">
          <!-- <button class="btn add-btn" @click="addItem">
            <i class="fas fa-plus"></i> Thư mục mới
          </button> -->

          <label class="btn upload-btn">
            <input type="file" class="hidden" @change="handleFileUpload" />Tải tệp lên
          </label>
        </div>

        <!-- File table -->
        <table class="file-table">
          <thead>
            <tr>
              <th>Tên</th>
              <th>Chủ sở hữu</th>
              <th>Sửa đổi</th>
              <th>Kích cỡ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in filteredItems" :key="index">
              <td
                @click="openFile(item.fileName)"
                class="cursor-pointer hover:text-yellow-600"
              >
                <i :class="item.icon"></i> {{ item.fileName }}
              </td>
              <td>{{ item.createdBy }}</td>
              <td>{{ item.createdAt }}</td>
              <td>{{ item.fileSize }}</td>
              <td>
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button variant="outline"> ... </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent class="w-45">
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <span
                          class="cursor-pointer hover:text-yellow-600"
                          @click="downloadFile(item.fileName)"
                          >Tải xuống</span
                        >
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span
                          @click="deleteFile(item.fileName)"
                          class="cursor-pointer hover:text-yellow-600"
                          >Xóa</span
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
    </div>

    <!-- Modal for Edit/Delete -->
    <!-- <div v-if="isModalOpen" class="modal">
          <div class="modal-content">
              <h3>Chọn hành động</h3>
              <div class="modal-actions">
                  <button class="modal-btn" @click="editItem">Sửa</button>
                  <button class="modal-btn" @click="deleteItem">Xóa</button>
                  <button class="modal-btn cancel-btn" @click="closeModal">Đóng</button>
              </div>
          </div>
      </div> -->
  </div>
</template>

<script setup>
import { Button } from "@/components/ui/button";
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
import { useAnswerStoreAPI } from "@/stores/answer";
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { format } from "date-fns";
import { ProjectStore } from "@/stores/project";

const route = useRoute();
const router = useRouter();
const surveyId = route.params.folderId;
const projectId = route.params.id;
const useAnswerStore = useAnswerStoreAPI();
const useProjectStore = ProjectStore();

const projectData = ref({});
const searchQuery = ref("");
const selectedType = ref("");
const fileData = ref([]);
const items = ref([
  {
    name: "Folder 1",
    owner: "ncthien2805@gmail.com",
    modified: "15/02/2025",
    size: "---",
    icon: "fas fa-folder",
    type: "folder",
  },
]);
const isModalOpen = ref(false);
const currentItem = ref(null);

const param = computed(() => route.params.id);

const filteredItems = computed(() => {
  return fileData.value.filter((item) => {
    const matchesSearch = item.fileName
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesType = selectedType.value ? item.fileType === selectedType.value : true;
    return matchesSearch && matchesType;
  });
});

const fetchFile = async (surveyId) => {
  try {
    await useAnswerStore.getFile(surveyId);
  } catch (e) {
    console.log(e);
  }
};

// const downloadFile = async (fileName) => {
//   console.log(fileName, surveyId);
//   const data = await useAnswerStore.downloadFile(surveyId, fileName);
//   console.log(data);
// };
const downloadFile = async (fileName) => {
  try {
    const fileUrl = `${import.meta.env.VITE_API_URI}/storage/${surveyId}/${fileName}`;
    const response = await fetch(fileUrl);

    if (!response.ok) {
      throw new Error("Không thể tải file!");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // Tạo một thẻ <a> để tải file xuống
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    console.log("Tải xuống thành công:", fileName);
  } catch (error) {
    console.error("Lỗi khi tải file:", error);
    alert("Lỗi khi tải file!");
  }
};
onMounted(async () => {
  const files = await useAnswerStore.getFile(surveyId);
  // Format lại dữ liệu
  const formattedFiles = files.map((file) => ({
    ...file,
    fileSize: `${(file.fileSize / 1024).toFixed(2)} KB`, // Chuyển Byte -> KB, làm tròn 2 chữ số thập phân
    createdAt: format(new Date(file.createdAt), "yyyy-MM-dd HH:mm:ss"), // Format thời gian
  }));

  fileData.value = formattedFiles;
  console.log("Formatted file data", fileData.value);
});

onMounted(async () => {
  const project = await useProjectStore.getProjectsById(projectId);
  projectData.value = project;
  console.log("fetch frontend", projectData);
});

const openFile = (fileName) => {
  const fileUrl = `${import.meta.env.VITE_API_URI}/storage/${surveyId}/${fileName}`;
  window.open(fileUrl, "_blank"); // Mở file trong tab mới
};

const deleteFile = async (fileName) => {
  await useAnswerStore.deleteFile(surveyId, fileName);
  window.location.reload();
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  await useAnswerStore.uploadfile(file, surveyId);
  window.location.reload();
};

const openModal = (item) => {
  currentItem.value = item;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  currentItem.value = null;
};

const editItem = () => {
  if (currentItem.value) {
    const newName = prompt("Nhập tên mới cho tệp:", currentItem.value.name);
    if (newName) {
      currentItem.value.name = newName;
    }
  }
};

const deleteItem = () => {
  if (currentItem.value) {
    const confirmDelete = confirm("Bạn có chắc chắn muốn xóa tệp này không?");
    if (confirmDelete) {
      items.value = items.value.filter((item) => item !== currentItem.value);
    }
  }
  closeModal();
};

const addItem = () => {
  const newFolderName = prompt("Nhập tên thư mục mới:");
  if (newFolderName) {
    items.value.push({
      name: newFolderName,
      owner: "ncthien2805@gmail.com",
      modified: new Date().toLocaleDateString(),
      size: "---",
      icon: "fas fa-folder",
      type: "folder",
    });
  }
};
</script>

<style scoped>
/* Import Font Awesome (hoặc bạn có thể cài đặt qua npm) */
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css");

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

/* Toàn màn hình với nền gradient */
.dashboards {
  height: 150vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

/* Main content */
.main-content {
  border-radius: 10px;
  display: flex;
  flex: 1;
  padding: 16px;
  gap: 16px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  height: 80vh;
}

/* Sidebar */
.sidebar {
  width: 25%;
  background: white;
  padding: 12px;
  border-radius: 8px;
  color: #6a11cb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 16px;
}

.sidebar-btn {
  /* display: block; */
  width: 100%;
  padding: 12px;
  margin-bottom: 8px;
  background: #f0f2f5;
  color: #6a11cb;
  border: none;
  border-radius: 8px;
  text-align: left;
  transition: background 0.3s;
  cursor: pointer;
}

.sidebar-btn:hover {
  background: rgba(106, 17, 203, 0.1);
}

.sidebar-btn.active {
  background: #6a11cb;
  color: white;
}

/* Content (bên phải) */
.content {
  flex: 1;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #333;
}

/* Search bar */
.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.search-bar input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
}

/* Button chung */
.btn {
  padding: 8px 12px;
  background: #6a11cb;
  color: white;
  border: none;
  border-radius: 8px;
  margin-left: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

/* Actions */
.actions {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.add-btn i,
.upload-btn i {
  margin-right: 4px;
}

/* Table */
.file-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.file-table th,
.file-table td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

.file-table th {
  background: rgba(106, 17, 203, 0.1);
}

.file-table td i {
  margin-right: 8px;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 300px;
  /* Đặt chiều rộng cho modal */
  text-align: center;
  /* Căn giữa nội dung */
}

.modal-actions {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  /* Khoảng cách giữa tiêu đề và các nút */
}

.modal-btn {
  padding: 10px;
  background: #6a11cb;
  color: white;
  border: none;
  border-radius: 5px;
  margin: 5px 0;
  /* Khoảng cách giữa các nút */
  cursor: pointer;
  transition: background 0.3s;
}

.modal-btn:hover {
  background: #5a0fb0;
  /* Màu khi hover */
}

.cancel-btn {
  background: #ccc;
  /* Màu cho nút đóng */
}

.cancel-btn:hover {
  background: #bbb;
  /* Màu khi hover cho nút đóng */
}
</style>
