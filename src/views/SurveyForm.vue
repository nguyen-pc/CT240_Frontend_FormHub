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
          <label v-for="option in question.choices" :key="option.choiceId">
            <input type="checkbox" :value="option.choiceId" v-model="question.answer" />
            {{ option.choiceText }}
          </label>
        </div>

        <!-- Câu hỏi File -->
        <div v-if="question.questionType === 'FILE_UPLOAD'">
          <file-pond
            ref="pond"
            name="files"
            label-idle="Kéo và thả file hoặc nhấp để chọn"
            allow-multiple="true"
            :accepted-file-types="[
              'image/*',
              'video/*',
              'application/pdf',
              'application/msword',
              'application/vnd.ms-excel',
            ]"
            @updatefiles="handleFileChange"
          />

          <!-- Hiển thị danh sách file đã tải lên -->
          <div v-if="uploadedFiles[question.id] && uploadedFiles[question.id].length">
            <p><strong>File đã tải lên:</strong></p>
            <ul>
              <li v-for="(file, index) in uploadedFiles[question.id]" :key="index">
                {{ file.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <button type="submit">Gửi khảo sát</button>
    </form>
  </div>
  <div class="space"><br /></div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed, onMounted, ref, reactive } from "vue";
import { SurveyStore } from "@/stores/survey";
import { useQuestionStoreAPI } from "@/stores/question";
import { useAnswerStoreAPI } from "@/stores/answer";
import vueFilePond from "vue-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import { registerPlugin } from "filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview);

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

const route = useRoute();
const projectId = route.params.projectId;
const surveyId = route.params.surveyId;

const useSurveyStore = SurveyStore();
const QuestionStore = useQuestionStoreAPI();
const useAnswerStore = useAnswerStoreAPI();
const uploadedFiles = ref({});

const fetchSurvey = async () => {
  await useSurveyStore.getSurveyById(projectId, surveyId);
};

const fetchQuestion = async () => {
  await QuestionStore.getAllQuestion(projectId, surveyId);
};

onMounted(() => {
  fetchSurvey();
  fetchQuestion();
});

const survey = computed(() => useSurveyStore.surveys);
const questions = computed(() => QuestionStore.questions);

// const handleFileChange = (question) => (files) => {
//   console.log(files);
//   uploadedFiles[question.id] = files.map((fileItem) => fileItem.file);
// };

// const onFileAdded = (error, file) => {
//   if (error) {
//     console.error("❌ FilePond error:", error);
//   } else {
//     console.log("📄 File added:", file.file);
//   }
// };

const handleFileChange = (files) => {
  console.log("🚀 FilePond event triggered!", files);
  if (!files || files.length === 0) {
    console.warn("⚠️ Không có file nào được tải lên!");
    return;
  }
  uploadedFiles.value = files.map((fileItem) => fileItem.file);
  const fileData = files[0].file;
  console.log("fileData", fileData);
  // uploadedFiles[question.id] = files.map((fileItem) => fileItem.file);
  // console.log(
  //   `📂 Files uploaded for question ${question.id}:`,
  //   uploadedFiles[question.id]
  // );
  return fileData;
};
const submitSurvey = async () => {
  // Tạo payload với field "answers" là mảng
  const payload = {
    answers: questions.value
      .map((question) => {
        // 1) Câu hỏi TEXT
        if (question.questionType === "TEXT") {
          return {
            question: {
              questionId: question.questionId,
            },
            answerText: question.answer || "", // Dữ liệu text người dùng nhập
            choice: {},
          };
        }

        // 2) Câu hỏi MULTIPLE_CHOICE (radio)
        else if (question.questionType === "MULTIPLE_CHOICE") {
          return {
            question: {
              questionId: question.questionId,
            },
            answerText: "", // Với trắc nghiệm, ta để trống
            choice: {
              choiceId: question.answer, // ID của lựa chọn được chọn
            },
          };
        }

        // 3) Câu hỏi CHECKBOX (nhiều lựa chọn)
        // => Mỗi lựa chọn trả về 1 object
        else if (question.questionType === "CHECKBOX") {
          return question.answer.map((choiceId) => ({
            question: {
              questionId: question.questionId,
            },
            answerText: "",
            choice: {
              choiceId: choiceId,
            },
          }));
        }

        // 4) Câu hỏi FILE_UPLOAD
        // => Bạn muốn lưu file thế nào tùy API; ví dụ:
        else if (question.questionType === "FILE_UPLOAD") {
          return {
            question: {
              questionId: question.questionId,
            },
            answerText: "",
            choice: {},
            // Tuỳ yêu cầu backend, có thể gửi kèm mảng file
            // files: uploadedFiles.value[question.id] || [],
          };
        }
      })
      .flat(), // Dùng .flat() để gộp mảng con (CHECKBOX) thành 1 mảng
  };

  // Kiểm tra kết quả trên console
  console.log("Submitting payload:", JSON.stringify(payload, null, 2));

  // Gọi API để gửi dữ liệu, ví dụ:
  try {
    // await QuestionStore.submitAnswers(surveyId, payload);
    const file = uploadedFiles.value;
    console.log("file API", file[0]);
    await useAnswerStore.uploadfile(file[0], surveyId);
    alert("Khảo sát đã được gửi thành công!");
  } catch (e) {
    console.error("Lỗi khi gửi khảo sát:", e);
  }
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
