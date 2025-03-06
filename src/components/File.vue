<template>
  <div class="dashboard">
    <!-- Header -->

    <!-- Main content -->
    <div class="main-content">
      <!-- Sidebar -->
      <div class="sidebar">
        <h2>Projects 1</h2>
        <router-link to="/main/project">
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
            <option value="folder">Thư mục</option>
            <option value="mp4">MP4</option>
            <option value="docx">DOCX</option>
            <option value="png">PNG</option>
          </select>
        </div>

        <div class="actions">
          <button class="btn add-btn" @click="addItem">
            <i class="fas fa-plus"></i> Thư mục mới
          </button>
          <button class="btn upload-btn">Tải tệp lên</button>
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
              <td><i :class="item.icon"></i> {{ item.name }}</td>
              <td>{{ item.owner }}</td>
              <td>{{ item.modified }}</td>
              <td>{{ item.size }}</td>
              <td>
                <i class="fas fa-ellipsis-h" @click="openModal(item)"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal for Edit/Delete -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <h3>Chọn hành động</h3>
        <div class="modal-actions">
          <button class="modal-btn" @click="editItem">Sửa</button>
          <button class="modal-btn" @click="deleteItem">Xóa</button>
          <button class="modal-btn cancel-btn" @click="closeModal">Đóng</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FileComponent",
  data() {
    return {
      searchQuery: "",
      selectedType: "",
      items: [
        {
          name: "Folder 1",
          owner: "ncthien2805@gmail.com",
          modified: "15/02/2025",
          size: "---",
          icon: "fas fa-folder",
          type: "folder",
        },
        {
          name: "Folder 2",
          owner: "phapchau@gmail.com",
          modified: "01/02/2025",
          size: "---",
          icon: "fas fa-folder",
          type: "folder",
        },
        {
          name: "Folder 3",
          owner: "ncthien2805@gmail.com",
          modified: "02/02/2025",
          size: "---",
          icon: "fas fa-folder",
          type: "folder",
        },
        {
          name: "search.png",
          owner: "ncthien2805@gmail.com",
          modified: "02/02/2025",
          size: "4MB",
          icon: "fas fa-file-image",
          type: "png",
        },
        {
          name: "work.docx",
          owner: "ncthien2805@gmail.com",
          modified: "02/02/2025",
          size: "2KB",
          icon: "fas fa-file-word",
          type: "docx",
        },
        {
          name: "video.mp4",
          owner: "ncthien2805@gmail.com",
          modified: "02/02/2025",
          size: "10MB",
          icon: "fas fa-file-video",
          type: "mp4",
        },
      ],
      isModalOpen: false,
      currentItem: null,
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter((item) => {
        const matchesSearch = item.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        const matchesType = this.selectedType ? item.type === this.selectedType : true;
        return matchesSearch && matchesType;
      });
    },
  },
  methods: {
    openModal(item) {
      this.currentItem = item;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.currentItem = null;
    },
    editItem() {
      if (this.currentItem) {
        const newName = prompt("Nhập tên mới cho tệp:", this.currentItem.name);
      }
    },
  },
  deleteItem() {
    if (this.currentItem) {
      const confirmDelete = confirm("Bạn có chắc chắn muốn xóa tệp này không?");
      if (confirmDelete) {
        this.items = this.items.filter((item) => item !== this.currentItem);
      }
    }
    this.closeModal();
  },
  addItem() {
    const newFolderName = prompt("Nhập tên thư mục mới:");
    if (newFolderName) {
      this.items.push({
        name: newFolderName,
        owner: "ncthien2805@gmail.com",
        modified: new Date().toLocaleDateString(),
        size: "---",
        icon: "fas fa-folder",
        type: "folder",
      });
    }
  },
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
  display: block;
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
