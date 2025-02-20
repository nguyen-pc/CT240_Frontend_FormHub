<template>
    <div class="dashboard">
        <!-- Header -->
        

        <!-- Main content -->
        <div class="main-content">
            <!-- Sidebar -->
            <div class="sidebar">
                <h2>Projects 1</h2>
                <router-link to="/main/project">
                    <button class="sidebar-btn">Phiếu khảo sát</button>
                </router-link>
                <button class="sidebar-btn active">Tài liệu</button>
            </div>

            <!-- Content -->
            <div class="content">

                <div class="search-bar">
                    <input type="text" placeholder="Nhập tên thư mục/file" v-model="searchQuery" />
                    <button class="btn">
                        <i class="fas fa-search"></i>
                    </button>

                    <select class="btn filter-btn">
                        <option>A - Z</option>
                        <option>Z - A</option>
                    </select>
                </div>


                <div class="actions">
                    <button class="btn add-btn">
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
                        <tr v-for="(item, index) in items" :key="index">
                            <td>
                                <i :class="item.icon"></i> {{ item.name }}
                            </td>
                            <td>{{ item.owner }}</td>
                            <td>{{ item.modified }}</td>
                            <td>{{ item.size }}</td>
                            <td><i class="fas fa-ellipsis-h"></i></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FileComponent',
    data() {
        return {
            searchQuery: '',
            items: [
                {
                    name: 'Folder 1',
                    owner: 'ncthien2805@gmail.com',
                    modified: '15/02/2025',
                    size: '---',
                    icon: 'fas fa-folder'
                },
                {
                    name: 'Folder 2',
                    owner: 'phapchau@gmail.com',
                    modified: '01/02/2025',
                    size: '---',
                    icon: 'fas fa-folder'
                },
                {
                    name: 'Folder 3',
                    owner: 'ncthien2805@gmail.com',
                    modified: '02/02/2025',
                    size: '---',
                    icon: 'fas fa-folder'
                },
                {
                    name: 'search.png',
                    owner: 'ncthien2805@gmail.com',
                    modified: '02/02/2025',
                    size: '4MB',
                    icon: 'fas fa-file-image'
                },
                {
                    name: 'work.docx',
                    owner: 'ncthien2805@gmail.com',
                    modified: '02/02/2025',
                    size: '2KB',
                    icon: 'fas fa-file-word'
                }
            ]
        };
    }
};
</script>

<style scoped>
/* Import Font Awesome (hoặc bạn có thể cài đặt qua npm) */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

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
    /* background: linear-gradient(to right, #6a11cb, #2575fc); */
}

/* Header */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: white;
}

.title {
    font-size: 24px;
    font-weight: bold;
    color: #6a11cb;
    margin: 0;
}

.user-info {
    display: flex;
    align-items: center;
}

.user-info span {
    margin-right: 16px;
    color: #333;
}

.user-avatar {
    width: 32px;
    height: 32px;
    background: #b71c1c;
    border-radius: 50%;
}

/* Breadcrumb */
.breadcrumb {
    border-radius: 14px;
    padding: 10px 2rem;
    color: #fff;
    background: linear-gradient(to right, #6a11cb, #2575fc);
    /* có thể dùng margin-top: 20px nếu muốn cách header */
}

.breadcrumb span {
    color: #fff;
    font-weight: 500;
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
    background: rgba(255, 255, 255, 0.9);
    padding: 16px;
    border-radius: 8px;
    color: #6a11cb;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sidebar h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 16px;
}

.sidebar-btn {
    display: block;
    width: 100%;
    padding: 12px;
    margin-bottom: 8px;
    background: white;
    color: #6a11cb;
    border: none;
    border-radius: 8px;
    text-align: left;
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

.file-tabl e th {
    background: rgba(106, 17, 203, 0.1);
}

.file-table td i {
    margin-right: 8px;
}
</style>