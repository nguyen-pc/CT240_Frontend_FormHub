<template>
    <div class="content-wrapper">
        <div class="container">
            <div class="main-content">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" />
                                </th>
                                <th>Ngày hoàn thành</th>
                                <th>Người thực hiện</th>
                                <th>question 1</th>
                                <th>question 2</th>
                                <th>question 3</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in data" :key="item.id">
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>{{ item.date }}</td>
                                <td>{{ item.user }}</td>
                                <td>{{ item.question1 }}</td>
                                <td>{{ item.question2 }}</td>
                                <td>{{ item.question3 }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import HeaderComponent from '../components/Header.vue';
export default {
    component: HeaderComponent,
  data() {
    return {
      data: [
        {
          id: 1,
          date: "15/02/2025 12:05",
          user: "ncthien2805@gmail.com",
          question1: "abcc",
          question2: "abcc",
          question3: "abcc",
        },
        {
          id: 2,
          date: "15/02/2025 12:06",
          user: "ncthien2805@gmail.com",
          question1: "abcc",
          question2: "abcc",
          question3: "abcc",
        },
      ],
    };
  },
};
</script>
<style scoped>
/* Content area */
.content-wrapper {
    padding: 20px;
    background: linear-gradient(to right, #6a11cb, #2575fc);
    border-radius: 20px;
    flex: 1;
    width: 100%;
}

.container {
    display: flex;
    height: calc(100vh - 120px);
}

/* Sidebar */
.sidebar {
    width: 250px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    height: fit-content;
}

.sidebar-header {
    padding: 1.5rem;
    border-bottom: 1px solid #eee;
}

.sidebar-menu {
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.sidebar-menu button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: #f0f2f5;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s;
}

.sidebar-menu button.active {
    background: #80acef;
    color: white;
    font-weight: 500;
}

.question-content {
    background-color: #2575fc;
    border-radius: 10px;
    padding: 10px;
    width: 70%;
}

.question-box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 10px;
    cursor: pointer;
    padding: 10px;
}

.question-box * {
    border-radius: 10px;
    padding: 5px;
}

.question-box .description {
    width: fit-content;
}

.question-box .answer {
    font-size: 25px;
}

.option {
    border-radius: 20px;
    margin-bottom: 5px;

}

/* Main content */
.main-content {
    flex: 1;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    margin-left: 15px;
}

.action-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
}

.add-question {
    flex: 1;
    display: flex;
    gap: 1rem;
    max-width: 500px;
    font-size: 30px;
}

.add-question input {
    flex: 1;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 8px;
}

.btn {
    background: #4c51bf;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: fit-content;
    margin-top: 8px;
}
.container {
  width: 100%;
  padding: 20px;
  font-family: sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header-title {
  font-size: 24px;
  font-weight: bold;
}

.table-responsive {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.table th {
  background-color: #f0f0f0;
  font-weight: bold;
}

</style>