<template>
  <div class="container">
    <h2>{{ survey.title }}</h2>
    <form @submit.prevent="submitSurvey">
      <div v-for="question in survey.questions" :key="question.id" class="question">
        <p>{{ question.question }}</p>

        <!-- Câu hỏi nhập liệu -->
        <input style="background-color: antiquewhite; border-radius: 5px; height: auto;" v-if="question.type === 'text'" v-model="question.answer" type="text" />

        <!-- Câu hỏi trắc nghiệm -->
        <div v-if="question.type === 'radio'">
          <label v-for="option in question.options" :key="option">
            <input type="radio" v-model="question.answer" :value="option" />
            {{ option }}
          </label>
        </div>

        <!-- Câu hỏi checkbox -->
        <div v-if="question.type === 'checkbox'">
          <label v-for="option in question.options" :key="option">
            <input type="checkbox" :value="option" v-model="question.answer" />
            {{ option }}
          </label>
        </div>
      </div>

      <button type="submit">Gửi khảo sát</button>
    </form>
  </div>
  <div class="space"> <br></div>
</template>

<script>
export default {
  data() {
    return {
      survey: {
        title: "Khảo sát ý kiến khách hàng",
        questions: [
          { id: 1, type: "text", question: "Bạn tên gì?", answer: "" },
          {
            id: 2,
            type: "radio",
            question: "Bạn thích sản phẩm nào nhất?",
            options: ["Sản phẩm A", "Sản phẩm B", "Sản phẩm C"],
            answer: "",
          },
          {
            id: 3,
            type: "checkbox",
            question: "Bạn quan tâm đến tính năng nào?",
            options: ["Giá rẻ", "Chất lượng", "Hỗ trợ khách hàng"],
            answer: [],
          },
          {
            id: 4,
            type: "radio",
            question: "Bạn quan tâm đến tính năng nào?",
            options: ["Giá rẻ", "Chất lượng", "Hỗ trợ khách hàng"],
            answer: [],
          },
          {
            id: 5,
            type: "radio",
            question: "Bạn quan tâm đến tính năng nào?",
            options: ["Giá rẻ", "Chất lượng", "Hỗ trợ khách hàng"],
            answer: [],
          },
        ],
      },
    };
  },
  methods: {
    submitSurvey() {
      console.log("Dữ liệu khảo sát:", this.survey.questions);
      alert("Cảm ơn bạn đã gửi phản hồi!");
    },
  },
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
