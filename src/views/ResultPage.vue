<template>
    <div class="content-wrapper">
        <ScrollArea>
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
                                    <th>question 4</th>
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
                                    <td>{{ item.question4 }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ScrollArea>


    </div>
</template>
<script>
import HeaderComponent from '../components/Header.vue';
import ScrollArea from '@/components/ui/scroll-area/ScrollArea.vue';
import ScrollBar from '@/components/ui/scroll-area/ScrollArea.vue';
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
                    question4: "abcc",
                },
                {
                    id: 2,
                    date: "15/02/2025 12:06",
                    user: "ncthien2805@gmail.com",
                    question1: "abcc",
                    question2: "abcc",
                    question3: "abcc",
                    question4: "abcc",
                },
                {
                    id: 1,
                    date: "15/02/2025 12:05",
                    user: "ncthien2805@gmail.com",
                    question1: "abcc",
                    question2: "abcc",
                    question3: "abcc",
                    question4: "abcc",
                },
                {
                    id: 2,
                    date: "15/02/2025 12:06",
                    user: "ncthien2805@gmail.com",
                    question1: "abcc",
                    question2: "abcc",
                    question3: "abcc",
                    question4: "abcc",
                },
                {
                    id: 1,
                    date: "15/02/2025 12:05",
                    user: "ncthien2805@gmail.com",
                    question1: "abcc",
                    question2: "abcc",
                    question3: "abcc",
                    question4: "abcc",
                },
                {
                    id: 2,
                    date: "15/02/2025 12:06",
                    user: "ncthien2805@gmail.com",
                    question1: "abcc",
                    question2: "abcc",
                    question3: "abcc",
                    question4: "abcc",
                },
                {
                    id: 1,
                    date: "15/02/2025 12:05",
                    user: "ncthien2805@gmail.com",
                    question1: "abcc",
                    question2: "abcc",
                    question3: "abcc",
                    question4: "abcc",
                },
                {
                    id: 2,
                    date: "15/02/2025 12:06",
                    user: "ncthien2805@gmail.com",
                    question1: "abcc",
                    question2: "abcc",
                    question3: "abcc",
                    question4: "abcc",
                },
                {
                    id: 1,
                    date: "15/02/2025 12:05",
                    user: "ncthien2805@gmail.com",
                    question1: "abcc",
                    question2: "abcc",
                    question3: "abcc",
                    question4: "abcc",
                },
                {
                    id: 2,
                    date: "15/02/2025 12:06",
                    user: "ncthien2805@gmail.com",
                    question1: "abcc",
                    question2: "abcc",
                    question3: "abcc",
                    question4: "abcc",
                },
                {
                    id: 1,
                    date: "15/02/2025 12:05",
                    user: "ncthien2805@gmail.com",
                    question1: "abcc",
                    question2: "abcc",
                    question3: "abcc",
                    question4: "abcc",
                },
                {
                    id: 2,
                    date: "15/02/2025 12:06",
                    user: "ncthien2805@gmail.com",
                    question1: "abcc",
                    question2: "abcc",
                    question3: "abcc",
                    question4: "abcc",
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
    font-size: 25px;
}

.container {
    display: flex;
    height: calc(100vh - 120px);
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
    overflow: auto;
    /* Thêm overflow: auto để bảng có thể cuộn */
}

.table-responsive {
    overflow-x: auto;
}

.table {
    width: 100%;
    border-collapse: collapse;
    white-space: nowrap;
    /* Ngăn bảng xuống dòng */
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