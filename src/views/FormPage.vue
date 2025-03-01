<template>
    <div class="content-wrapper">
        <div class="container">
            <div class="sidebar">
                <div class="sidebar-header">
                    <h2>Form 1</h2>
                </div>
                <div class="sidebar-menu">
                    <button v-for="question in questions" :key="question.id" :class="{ active: question.active }"
                        @click="setActiveQuestion(question.id)">
                        {{ question.title }}
                    </button>
                </div>
            </div>
            <div class="main-content">
                <div class="action-bar">
                    <div class="add-question">
                        <button class="btn">+ Thêm câu hỏi</button>
                    </div>
                    <div class="get-link">
                        <button class="btn" @click="getCurrentURL">Sao chép đường dẫn</button>
                    </div>
                </div>
                <div class="d-flex">
                    <div class="question-content">
                        <div v-if="activeQuestion">
                            <h4>{{ activeQuestion.title }}</h4>
                            <div class="question-box">
                                <input class="description" type="text" placeholder="Mô tả" />
                                <input class="answer" type="text" placeholder="Điền câu trả lời của bạn ở đây">
                            </div>
                        </div>
                    </div>
                    <div class="">
                        
                    </div>
                </div>
                <button class="btn">Lưu</button>
            </div>
        </div>

    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useQuestionStore } from '../stores/store';

const questionStore = useQuestionStore();
const {setActiveQuestion} = questionStore;
const { questions, activeQuestion, } = storeToRefs(questionStore);
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
    background: #6a11cb;
    color: white;
    font-weight: 500;
}

.question-content {
    background: #6a11cb;
    border-radius: 10px;
    padding: 10px;
    width: 70%;
    color: white;
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
    background: #6a11cb;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: fit-content;
    margin-top: 8px;
}
</style>