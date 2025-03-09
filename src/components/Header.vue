<template>
  <header>
    <div class="header-info">
      <h1 id="logoName">FORM HUB</h1>
      <div class="user-info">
        <span class="user-name">{{ user.user?.name || "Khách" }}</span>
        <div class="user-avatar"></div>
        <span @click="logout" v-if="isAuthenticated" class="cursor-pointer"
          ><img class="w-7 h-7" src="../assets/images/logout.png"
        /></span>
      </div>
    </div>
    <div class="direction">
      <Breadcrumb :segments="segments" />
      <div v-if="showFormOption" class="form-option">
        <router-link :to="getModifiedURLQuestion()">
          <button class="btn form">Câu hỏi</button>
        </router-link>
        <router-link :to="getModifiedURL()">
          <button class="btn form">Phản hồi</button>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import Breadcrumb from "./Breadcrumb.vue";
import { computed, onMounted, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    Breadcrumb,
  },
  setup() {
    const authStore = useAuthStore();
    const route = useRoute();
    const router = useRouter();
    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const user = computed(() => authStore.userDetail);
    const segments = ref([]);
    const showFormOption = ref(false);

    const createSegments = (path, params) => {
      console.log("param", params.id);
      const segmentsList = [{ name: "Trang chủ", path: "/" }];

      let projectId = params.id || localStorage.getItem("projectId");
      if (path.includes("/main/project")) {
        if (params.id) {
          localStorage.setItem("projectId", params.id); // Lưu ID khi vào dự án
        }
        segmentsList.push({ name: "Dự án", path: `/main/project/${projectId}` });
      }

      if (path.includes("/survey")) {
        const surveyId = params.surveyId
          ? `/main/project/${params.id}/survey/${params.surveyId}`
          : "/main/project/form";
        segmentsList.push({ name: "Khảo sát", path: surveyId });
      }
      if (path.includes("/result")) {
        segmentsList.push({ name: "Kết quả", path: `/main/project/form/result` });
      }
      return segmentsList;
    };

    watch(
      () => route.path,
      (newPath) => {
        localStorage.setItem("breadcrumbPath", newPath);
        segments.value = createSegments(newPath, route.params);
        showFormOption.value =
          newPath.includes("/main/project") && newPath.includes("/survey");
      },
      { immediate: true }
    );

    onMounted(async () => {
      await authStore.getUser();
      const savedPath = localStorage.getItem("breadcrumbPath") || route.path;
      segments.value = createSegments(savedPath);
    });

    const getModifiedURL = () => `${route.path}/result`;
    const getModifiedURLQuestion = () => `${route.path}/question/all`;

    const logout = async () => {
      await authStore
        .logout()
        .then(() => {
          localStorage.removeItem("breadcrumbPath");
          router.replace({ name: "signin" });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      user,
      isAuthenticated,
      segments,
      showFormOption,
      getModifiedURL,
      getModifiedURLQuestion,
      logout,
    };
  },
};
</script>

<style scoped>
.header-info {
  display: flex;
  justify-content: space-between;
}

.direction {
  border-radius: 10px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  color: white;
  padding: 5px;
  display: flex;
}
.direction .form-option {
  border-radius: 50px;
}
.form {
  margin: 15px;
  color: white;
  font-size: 20px;
}
.form:hover {
  color: pink;
}
#logoName {
  color: blue;
}

.user-info {
  display: flex;
  align-items: center;
  font-size: 20px;
}

.user-name {
  color: black;
}

.user-avatar {
  width: 30px;
  height: 30px;
  background: red;
  border-radius: 50%;
}
</style>
