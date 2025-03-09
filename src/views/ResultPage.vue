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
                  <th v-for="(answer, index) in responseData[0]?.answers" :key="index">
                    Câu hỏi {{ index + 1 }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in responseData" :key="item.responseId">
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{{ formatDateTime(item.answers[0]?.createdAt) }}</td>
                  <td>{{ item.answers[0]?.question.createdBy }}</td>
                  <td v-for="answer in item.answers" :key="answer.answerId">
                    <template
                      v-if="
                        answer.question.questionType === 'MULTIPLE_CHOICE' ||
                        answer.question.questionType === 'FILE_UPLOAD' ||
                        answer.question.questionType === 'CHECKBOX'
                      "
                    >
                      <!-- <span v-for="choice in answer.choice" :key="choice.choiceId"> -->
                      {{ answer.choice.choiceText }}
                      <!-- </span> -->
                    </template>
                    <template v-else>
                      {{ answer.answerText }}
                    </template>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ScrollArea>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ScrollArea from "@/components/ui/scroll-area/ScrollArea.vue";
import { useAnswerStoreAPI } from "@/stores/answer";

const route = useRoute();
const useAnswerStore = useAnswerStoreAPI();
const projectId = route.params.projectId;
const surveyId = route.params.surveyId;
const responseData = ref([]);

onMounted(async () => {
  const responseDataAPI = await useAnswerStore.getAllResponse(projectId, surveyId);
  responseData.value = responseDataAPI;
});

const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
</script>

<style scoped>
.content-wrapper {
  padding: 20px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  border-radius: 20px;
  width: 100%;
}

.container {
  display: flex;
  height: calc(100vh - 120px);
}

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
}

.table-responsive {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
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
