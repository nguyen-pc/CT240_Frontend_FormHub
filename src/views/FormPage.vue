<template>
  <div class="content-wrapper">
    <div class="container">
      <div class="sidebar">
        <div class="sidebar-header">
          <h2>Form 1</h2>
        </div>
        <ScrollArea>
          <div class="sidebar-menu">
            <button
              v-for="(question, index) in questionsAPI"
              :key="question.questionId"
              :class="{ active: question.active }"
              @click="setActiveQuestionAPI(question.questionId)"
            >
              {{ index + 1 }}. {{ question.questionName }}
              <i
                class="fa fa-trash"
                @click.stop="deleteQuestionAPI(projectId, surveyId, question.questionId)"
              ></i>
            </button>
          </div>
        </ScrollArea>
      </div>
      <div class="main-content">
        <div class="action-bar">
          <div class="add-question">
            <button @click="addQuestion" class="btn">+ Thêm câu hỏi</button>
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
                <input
                  v-model="questionName"
                  class="name"
                  type="text"
                  placeholder="Nhập tiêu đề cho câu hỏi"
                />
                <div
                  v-if="questionType === 'MULTIPLE_CHOICE' || questionType === 'CHECKBOX'"
                  class="choices d-flex flex-column"
                >
                  <button @click="addChoice" class="btn">+ Thêm tùy chọn đáp án</button>
                  <ScrollArea>
                    <div class="choice-zone">
                      <div
                        class="d-flex"
                        v-for="choice in activeQuestion.choices"
                        :key="choice.id"
                      >
                        <input
                          class="choice"
                          v-model="choice.name"
                          :placeholder="choice.placeholder"
                        />
                        <i class="fa fa-trash" @click="deleteChoice(choice.id)"></i>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex flex-column gap-2 optional">
            <div>
              <input
                v-model="activeQuestion.require"
                id="checkRequired"
                type="checkbox"
              />
              <label for="checkRequired">Bắt buộc</label>
            </div>
            <QuestionOption v-model:type="questionType" @update:type="updateType" />
          </div>
        </div>
        <!-- <button type="submit" class="btn">Lưu</button> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted, ref, watch } from "vue";
import { useQuestionStore } from "../stores/store";
import QuestionOption from "@/components/QuestionOption.vue";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuestionStoreAPI } from "@/stores/question";
import { useRoute } from "vue-router";
const questionStore = useQuestionStore();
const QuestionStoreAPI = useQuestionStoreAPI();
const { setActiveQuestion } = questionStore;
const { questions, activeQuestion } = storeToRefs(questionStore);

const route = useRoute();
const projectId = route.params.projectId;
const surveyId = route.params.surveyId;
const questionData = ref({});

const fetchQuestion = async () => {
  console.log("Fetching question...");
  try {
    await QuestionStoreAPI.getAllQuestion(projectId, surveyId);
    // Đảm bảo answer của mỗi câu hỏi CHECKBOX là một mảng
    QuestionStoreAPI.questions.forEach((question) => {
      if (question.questionType === "CHECKBOX" && !Array.isArray(question.answer)) {
        question.answer = []; // Khởi tạo là mảng rỗng
      }
    });
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  fetchQuestion();
});

const questionsAPI = computed(() => QuestionStoreAPI.questions);
console.log("QuestionAPI", questionsAPI);

const getFormattedQuestionData = () => {
  if (!activeQuestion.value) return null;

  const formattedData = {
    questionName: activeQuestion.value.name,
    questionType: activeQuestion.value.type,
    require: activeQuestion.value.require,
    choices: activeQuestion.value.choices.map((choice) => ({
      choiceText: choice.name,
    })),
  };

  console.log("Dữ liệu theo định dạng API:", formattedData);
  return formattedData;
};

const setActiveQuestionAPI = async (questionId) => {
  try {
    const question = await QuestionStoreAPI.getQuestionById(
      projectId,
      surveyId,
      questionId
    );
    console.log(question);
    // questionStore.setActiveQuestion(question); // Cập nhật vào Pinia
  } catch (e) {
    console.error("Lỗi khi lấy câu hỏi:", e);
  }
};
// const questionName = computed({
//   get: () => activeQuestion.value?.name || "",
//   set: (newName) => {
//     if (activeQuestion.value) {
//       activeQuestion.value.name = newName;
//     }
//   },
// });

// const questionType = computed({
//   get: () => activeQuestion.value?.type || "",
//   set: (newType) => {
//     if (activeQuestion.value) {
//       activeQuestion.value.type = newType;
//     }
//   },
// });

console.log("active", activeQuestion);
const addQuestion = async () => {
  // questionStore.addQuestion();
  const questionData = getFormattedQuestionData();
  await QuestionStoreAPI.createQuestion(projectId, surveyId, questionData);
  fetchQuestion();
};
const addChoice = () => {
  questionStore.addChoice();
};
// Tạo `ref` theo dõi: Question name là tên (nội dung) câu hỏi, question type là loại câu hỏi
// Cả 2 đại diện cho khung câu hỏi hiển thị
const questionName = ref(activeQuestion?.value?.name || "");
const questionType = ref(activeQuestion?.value?.type || "");
// Cập nhật giá trị name của câu hỏi khi thay đổi
watch(questionName, (newName) => {
  activeQuestion.value.name = newName;
});
// Cập nhật giá trị type của câu hỏi khi thay đổi
watch(questionType, (newType) => {
  activeQuestion.value.type = newType;
});

watch(
  activeQuestion,
  (newQuestion) => {
    //Cập nhật giá trị đúng question box khi chuyển sang câu khác
    questionName.value = newQuestion.name;
    questionType.value = newQuestion.type;
    //console.log(activeQuestion.value);
  },
  { deep: true }
);

const updateType = (value) => {
  questionType.value = value;
};
const deleteQuestion = (id) => {
  // Logic xóa câu hỏi dựa trên id
  if (questions.value.length > 1) {
    const index = questions.value.findIndex((question) => question.id === id);
    if (index !== -1) {
      if (questions.value[index] === activeQuestion.value) {
        if (index == 0) questions.value[1].active = true;
        else questions.value[index - 1].active = true;
      }
      questions.value.splice(index, 1);

      questionStore.updateID();
    }
  }
};

// onMounted(async () => {
//   const question = await QuestionStoreAPI.getQuestionById(projectId, surveyId);
//   .value = project;
//   console.log("fetch frontend", projectData);
// });

const deleteQuestionAPI = async (projectId, surveyId, questionId) => {
  await QuestionStoreAPI.deleteQuestion(projectId, surveyId, questionId);
  await fetchQuestion();
};

const deleteChoice = (id) => {
  if (activeQuestion.value?.choices.length > 1) {
    const index = activeQuestion.value.choices.findIndex((choice) => choice.id === id);
    if (index !== -1) {
      activeQuestion.value.choices.splice(index, 1);
      questionStore.updateChoiceID();
    }
  }
};
const getCurrentURL = async () => {
  try {
    let currentURL = window.location.href;
    currentURL = currentURL + "/question/all";
    await navigator.clipboard.writeText(currentURL);
    console.log(currentURL);
  } catch (error) {
    console.error("Lỗi khi sao chép đường dẫn: ", error);
  }
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
  max-height: calc(100vh - 120px);
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.sidebar-menu {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: calc(100vh - 220px);
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
  display: flex;
  justify-content: space-between;
}

.sidebar-menu button:hover {
  box-shadow: 2px 3px 4px rgba(0, 0, 0, 0.2);
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
  color: black;
}

.question-box * {
  border-radius: 10px;
  padding: 5px;
}

.question-box .question-title {
  width: 100%;
}

.question-box .answer {
  font-size: 25px;
}

.question-box input {
  height: fit-content;
  font-size: 20px;
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

.choices {
  background-color: white;
}

.choice {
  width: 100%;
  border: 1px solid black;
}

.choice-zone {
  max-height: calc(100vh - 440px);
}

.optional {
  margin: 0 auto;
  width: 180px;
  font-size: 18px;
}

.fa-trash {
  margin: auto 0;
}

.fa-trash:hover {
  color: red;
}
</style>
