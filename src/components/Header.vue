<template>
  <header>
    <div class="header-info">
      <h1 id="logoName">FORM HUB</h1>
      <div class="user-info">
        <span class="user-name">Chí Thiên</span>
        <div class="user-avatar"></div>
      </div>
    </div>
    <div class="direction">
      <Breadcrumb :segments="segments" />
      <div v-if="showFormOption" class="form-option">
        <router-link to="/main/project/form"><button class="btn form">Câu hỏi</button></router-link>
        <router-link to="/main/project/form/result"><button class="btn form">Phản hồi</button></router-link>
      </div>
    </div>
  </header>
</template>

<script>
import Breadcrumb from './Breadcrumb.vue';
export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      segments: [],
      showFormOption: false
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        this.segments = this.createSegments(to);
        this.showFormOption = (to.path === '/main/project/form'||to.path === '/main/project/form/result')
      }
    }
  },
  methods: {
    createSegments(route) {
      const segments = [{ name: 'Trang chủ', path: '/main' }];
      if (route.name === 'project' ) {
        segments.push({ name: 'Dự án', path: '/main/project' });
      }
      else if(route.name === 'project-file'){
        segments.push({ name: 'Dự án', path: '/main/project/file' });
      }
       else if (route.name === 'form') {
        segments.push({ name: 'Dự án', path: '/main/project' });
        segments.push({ name: 'Khảo sát', path: `/main/project/form` });
      }
      else if(route.name ==='form-result'){
        segments.push({ name: 'Dự án', path: '/main/project' });
        segments.push({ name: 'Khảo sát', path: `/main/project/form/result` });
      }
      return segments;
    },
  }
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
.direction .form-option{
  border-radius: 50px;
}
.form{
  margin: 15px;
  color: white;
  font-size: 20px;
}
.form:hover{
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
