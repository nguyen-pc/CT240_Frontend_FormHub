<template>
  <div class="content-wrapper">
    <ScrollArea>
      <div class="container">
        <div class="main-content">
          <div class="table-responsive">
            <button @click="exportToExcel" class="export-btn">Xuất Excel</button>
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
                <tr v-for="(item, indexResponse) in responseData" :key="item.responseId">
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{{ formatDateTime(item.answers[0]?.createdAt) }}</td>
                  <td>{{ item.answers[0]?.question.createdBy }}</td>
                  <td
                    v-for="(answer, indexAnswer) in item.answers"
                    :key="answer.answerId"
                  >
                    <template
                      v-if="
                        answer.question.questionType === 'MULTIPLE_CHOICE' ||
                        answer.question.questionType === 'CHECKBOX'
                      "
                    >
                      <span v-for="choice in answer.choices" :key="choice.choiceId">
                        {{ choice.choiceText + " " }}
                      </span>
                    </template>
                    <template v-if="answer.question.questionType === 'FILE_UPLOAD'">
                      <span
                        v-if="fileData[indexResponse]"
                        @click="openFile(fileData[indexResponse].fileName)"
                        class="cursor-pointer hover:text-yellow-600 text-blue-500"
                      >
                        FILE
                      </span>
                      <span v-else>Không có tệp</span>
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
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { SurveyStore } from "@/stores/survey";
import { format } from "date-fns";

const route = useRoute();
const useAnswerStore = useAnswerStoreAPI();
const surveyStore = SurveyStore();
const projectId = route.params.projectId;
const surveyId = route.params.surveyId;
const responseData = ref([]);
const surveyData = ref({});
const fileData = ref([]);

onMounted(async () => {
  const responseDataAPI = await useAnswerStore.getAllResponse(projectId, surveyId);
  responseData.value = responseDataAPI;
});

const fetchSurvey = async () => {
  const survey = await surveyStore.getSurveyById(projectId, surveyId);
  surveyData.value = survey;
};

onMounted(fetchSurvey);
onMounted(async () => {
  const files = await useAnswerStore.getFile(surveyId);
  // Format lại dữ liệu
  const formattedFiles = files.map((file) => ({
    ...file,
    fileSize: `${(file.fileSize / 1024).toFixed(2)} KB`, // Chuyển Byte -> KB, làm tròn 2 chữ số thập phân
    createdAt: format(new Date(file.createdAt), "yyyy-MM-dd HH:mm:ss"), // Format thời gian
  }));

  fileData.value = formattedFiles;
  console.log("Formatted file data", fileData.value[0].fileName);
});

const openFile = (fileName) => {
  const fileUrl = `${import.meta.env.VITE_API_URI}/storage/${surveyId}/${fileName}`;
  window.open(fileUrl, "_blank"); // Mở file trong tab mới
};

console.log(surveyData);
console.log(surveyData.value);

// Hàm xuất file Excel
const exportToExcel = () => {
  if (responseData.value.length === 0) {
    alert("Không có dữ liệu để xuất!");
    return;
  }

  const sheetData = [];
  sheetData.push([
    `Biểu mẫu: ${surveyData.value.surveyName || "Biểu mẫu không có tiêu đề"}`,
  ]); // Hàng tiêu đề
  sheetData.push([]); // Dòng trống

  const headers = ["Ngày hoàn thành", "Người thực hiện"];
  if (responseData.value.length > 0) {
    responseData.value[0].answers.forEach((_, index) => {
      headers.push(`Câu hỏi ${index + 1}`);
    });
  }
  sheetData.push(headers);

  responseData.value.forEach((item, indexResponse) => {
    const row = [
      formatDateTime(item.answers[0]?.createdAt),
      item.answers[0]?.question.createdBy,
    ];

    item.answers.forEach((answer, indexAnswer) => {
      if (
        answer.question.questionType === "MULTIPLE_CHOICE" ||
        answer.question.questionType === "CHECKBOX"
      ) {
        row.push(answer.choices.map((choice) => choice.choiceText).join(", "));
      } else if (answer.question.questionType === "FILE_UPLOAD") {
        if (fileData.value[indexResponse]) {
          const fileName = fileData.value[indexResponse].fileName;
          const fileUrl = `${
            import.meta.env.VITE_API_URI
          }/storage/${surveyId}/${fileName}`;
          row.push({
            v: `FILE`, // Văn bản hiển thị
            l: { Target: fileUrl }, // Gán hyperlink
          });
        } else {
          row.push("Không có tệp");
        }
      } else {
        row.push(answer.answerText);
      }
    });

    sheetData.push(row);
  });

  const ws = XLSX.utils.aoa_to_sheet(sheetData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Responses");

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const fileName = `responses_${surveyData.value.surveyName || "survey"}.xlsx`;
  saveAs(blob, fileName);
};

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
.export-btn {
  background-color: #6914cd;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 15px;
}

.export-btn:hover {
  background-color: #2674fc;
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
