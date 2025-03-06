<template>
  <div class="container">
    <h2>{{ survey.surveyName }}</h2>
    <form @submit.prevent="submitSurvey">
      <div v-for="question in questions" :key="question.id" class="question">
        <p>{{ question.questionName }}</p>

        <!-- Câu hỏi nhập liệu -->
        <input
          style="background-color: antiquewhite; border-radius: 5px; height: auto"
          v-if="question.questionType === 'TEXT'"
          v-model="question.answer"
          type="text"
        />

        <!-- Câu hỏi trắc nghiệm -->
        <div v-if="question.questionType === 'MULTIPLE_CHOICE'">
          <label v-for="option in question.choices" :key="option.choiceId">
            <input type="radio" v-model="question.answer" :value="option.choiceId" />
            {{ option.choiceText }}
          </label>
        </div>

        <!-- Câu hỏi checkbox -->
        <div v-if="question.questionType === 'CHECKBOX'">
          <label v-for="option in question.choices" :key="option">
            <input type="checkbox" :value="option" v-model="question.answer" />
            {{ option }}
          </label>
        </div>
      </div>

      <button type="submit">Gửi khảo sát</button>
    </form>
  </div>
  <div class="space"><br /></div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { SurveyStore } from "@/stores/survey";
import { useQuestionStore } from "@/stores/question";

const route = useRoute();
const projectId = route.params.projectId;
const surveyId = route.params.surveyId;

console.log(projectId, surveyId);

const useSurveyStore = SurveyStore();
const QuestionStore = useQuestionStore();

const fetchQuestion = async () => {
  console.log("Fetching question...");
  try {
    await QuestionStore.getAllQuestion(projectId, surveyId);
  } catch (e) {
    console.log(e);
  }
};

const fetchSurvey = async () => {
  console.log("Fetching surveys...");
  try {
    await useSurveyStore.getSurveyById(projectId, surveyId);
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  fetchSurvey();
  fetchQuestion();
}); // const projectStore = useProjectStore();
const survey = computed(() => useSurveyStore.surveys);
const questions = computed(() => QuestionStore.questions);
console.log("All Question", questions.value);

const submitSurvey = async () => {
  const answers = questions.value
    .map((question) => {
      if (question.questionType === "TEXT") {
        return { questionId: question.questionId, answerText: question.answer || "" };
      } else if (question.questionType === "MULTIPLE_CHOICE") {
        return { questionId: question.questionId, choiceId: question.answer };
      } else if (question.questionType === "CHECKBOX") {
        return question.answer.map((choice) => ({
          questionId: question.questionId,
          choiceId: choice,
        }));
      }
    })
    .flat(); // Dùng flat() để xử lý CHECKBOX trả về mảng

  console.log("Submitting answers:", answers);
  // Goi API xử lí trả lời câu hỏi
  // try {
  //   await QuestionStore.submitAnswers({ answers });
  //   alert("Khảo sát đã được gửi thành công!");
  // } catch (e) {
  //   console.error("Lỗi khi gửi khảo sát:", e);
  // }
};
</script>

<style scoped>
.container {
  width: 70%;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 100px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  height: auto;
}

h2 {
  text-align: center;
  color: #333;
}

.question {
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

.question p {
  font-weight: bold;
  margin-bottom: 10px;
}

/* Ô nhập liệu */
input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: antiquewhite;
  height: auto;
}

/* Câu hỏi trắc nghiệm (radio & checkbox) xuống dòng */
.question label {
  display: block;
  margin-bottom: 5px;
}

/* Nút gửi */
button {
  width: 100%;
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}
</style>
