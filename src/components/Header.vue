<template>
  <header>
    <div class="header-info">
      <h1 id="logoName">FORM HUB</h1>
      <div class="user-info">
        <span class="user-name">{{ user?.name || "Khách" }}</span>
        <div class="user-avatar"></div>
        <span @click="logout" v-if="isAuthenticated" class="cursor-pointer">Logout</span>
      </div>
    </div>
    <div class="direction">
      <Breadcrumb>
        <BreadcrumbItem v-for="(breadcrumb, index) in breadcrumbs" :key="index">
          <router-link :to="breadcrumb.href">{{ breadcrumb.name }}</router-link>
        </BreadcrumbItem>
      </Breadcrumb>
      <div v-if="showFormOption" class="form-option">
        <router-link to="/main/project/form"><button class="btn form">Câu hỏi</button></router-link>
        <router-link to="/main/project/form/result"><button class="btn form">Phản hồi</button></router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
import { computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/breadcrumb';

export default {
  components: {
    Breadcrumb,
    BreadcrumbItem,

  },
  data() {
    return {
      segments: [],
      showFormOption: false,
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        this.segments = this.createSegments(to);
        this.showFormOption =
          to.path === "/main/project/form" || to.path === "/main/project/form/result";
      },
    },
  },
  methods: {
    createSegments(route) {
      const segments = [{ name: "Trang chủ", path: "/" }];
      if (route.name === "project") {
        segments.push({ name: "Dự án", path: "/main/project/:id" });
      } else if (route.name === "project-file") {
        segments.push({ name: "Dự án", path: "`/main/project/:id/file`" });
      } else if (route.name === "form") {
        segments.push({ name: "Dự án", path: "/main/project/:id" });
        segments.push({ name: "Khảo sát", path: `/main/project/form` });
      } else if (route.name === "form-result") {
        segments.push({ name: "Dự án", path: "/main/project" });
        segments.push({ name: "Khảo sát", path: `/main/project/form/result` });
      }
      return segments;
    },
    async logout() {
      const authStore = useAuthStore();

      await authStore
        .logout()
        .then(() => {
          this.$router.replace({ name: "signin" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  setup() {
    const authStore = useAuthStore();
    const route = useRoute();
    const router = useRouter();

    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const user = computed(() => authStore.userDetail);
    const showFormOption = computed(() => route.path === "/main/project/form" || route.path === "/main/project/form/result");

    const breadcrumbs = computed(() => {
      const projectId = route.params.id;
      const crumbs = [{ name: "Trang chủ", href: "/main" }];

      if (route.name === "project" && projectId) {
        crumbs.push({ name: "Dự án", href: `/main/project/${projectId}` });
      } else if (route.name === "project-file") {
        crumbs.push({ name: "Dự án", href: "/main/project/file" });
      } else if (route.name === "form" && projectId) {
        crumbs.push({ name: "Dự án", href: `/main/project/${projectId}` });
        crumbs.push({ name: "Khảo sát", href: `/main/project/form` });
      } else if (route.name === "form-result" && projectId) {
        crumbs.push({ name: "Dự án", href: `/main/project/${projectId}` });
        crumbs.push({ name: "Phản hồi", href: `/main/project/form/result` });
      }

      return crumbs;
    });

    onMounted(async () => {
      await authStore.getUser();
    });

    watch(user, (newValue) => {
      console.log("User updated:", newValue);
    });

    const logout = async () => {
      await authStore.logout().then(() => {
        router.replace({ name: "signin" });
      }).catch((err) => {
        console.error(err);
      });
    };

    return {
      user,
      isAuthenticated,
      breadcrumbs,
      showFormOption,
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
