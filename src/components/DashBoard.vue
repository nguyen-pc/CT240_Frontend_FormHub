<template>
  <div class="dashboard">
    <div class="search-bar">
      <div class="add-project"><button class="btn">+</button>Dự án mới</div>
      <input type="text" style="color: black" placeholder="Nhập dự án cần tìm" />
      <button class="btn">A-Z</button>
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
            <td><router-link to="/main/project" class="project-name">{{ project.name }}</router-link></td>
            <td>{{ project.surveys }}</td>
            <td>{{ project.modified }}</td>
            <td>{{ project.owner }}</td>
            <td>...</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
export default {
  name: "DashboardComponent",
  data() {
    return {
      projects: [
        { name: "Projects 1", surveys: 4, modified: "15/02/2025", owner: "ncthien2805@gmail.com" },
        { name: "Projects 2", surveys: 15, modified: "01/02/2025", owner: "phapchau@gmail.com" },
        { name: "Projects 3", surveys: 1, modified: "02/02/2025", owner: "ncthien2805@gmail.com" },
      ],
    };
  },
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

.search-bar {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  gap: 30px;
  font-size: 20px;
}

.add-project {
  display: flex;
  justify-content: space-between;
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
}

.dot {
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
}
</style>
