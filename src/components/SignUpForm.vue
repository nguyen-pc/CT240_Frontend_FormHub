<template>
  <Form @submit="submitForm">
    <div class="form-group">
      <Field name="username" type="text" class="form-control" placeholder="Nhập tên đăng nhập" />
    </div>

    <div class="form-group">
      <Field name="password" type="password" class="form-control" placeholder="Nhập mật khẩu" />
    </div>

    <div class="form-group">
      <Field name="confirmPassword" type="password" class="form-control" placeholder="Nhập lại mật khẩu" />
    </div>
    
    <div class="form-group">
      <button class="btn_login" type="submit">
        Đăng Ký
      </button>
    </div>
  </Form>
</template>

<script>
import { Form, Field } from 'vee-validate'; // Đảm bảo import đúng

export default {
  components: {
    Form,
    Field
  },
  methods: {
    submitForm(values) {
      // Xử lý khi form được submit, values chứa các giá trị từ các trường
      console.log(values);
    }
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  font-size: 14px;
}

/* Nút đăng ký */
.btn_login {
  height: 40px;
  border: 2px solid #fff;
  border-radius: 20px;
  background: transparent;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: 0.3s;
  margin: 10px;
}

.btn_login:hover {
  background: white;
  color: #6f5fe2;
}
</style>
