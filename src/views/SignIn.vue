<template>
  <div class="login-container">
    <!-- Cột bên trái: FORM HUB -->
    <div class="left-section">
      <h1 class="title">FORM HUB</h1>
      <p class="caption">Nền tảng giúp bạn quản lý dự án một cách dễ dàng.</p>
    </div>

    <!-- Cột bên phải: Form đăng nhập -->
    <div class="right-section">
      <div class="form-container">
        <div class="page">
          <h3>ĐĂNG NHẬP</h3>
          <SignInForm />
          <p>{{ message }}</p>
          <p>Chưa có tài khoản?</p>
          <button @click="register" class="btn_login">Đăng ký</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SignInForm from "@/components/SignInForm.vue";
export default {
  components: {
    SignInForm,
  },

  methods: {
    register() {
      this.$router.replace({ name: "signup" });
    },
  },
};
</script>

<style scoped>
/* Container chính */
.login-container {
  display: flex;
  height: 100vh;
  background-image: url("../assets/images/artistic-blurry-colorful-wallpaper-background_58702-8196.jpg");
  background-size: cover;
  background-position: center;
  color: white;
  border-radius: 50px;
}

/* Cột bên trái */
.left-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  text-align: center;
}

.title {
  font-size: 3rem;
  font-weight: bold;
}

.caption {
  font-size: 1.2rem;
  margin-top: 10px;
  max-width: 400px;
}

/* Cột bên phải */
.right-section {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Form đăng nhập */
.form-container {
  width: 350px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  text-align: center;
  height: auto;
  max-width: 90%;
}

h3 {
  margin-bottom: 20px;
}

/* Nút đăng ký */
.btn_login {
  width: 200px;
  height: 40px;
  border: 2px solid #fff;
  border-radius: 20px;
  background: transparent;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: 0.3s;
}

.btn_login:hover {
  background: white;
  color: #6f5fe2;
}

/* ================ 📱 THIẾT KẾ ĐÁP ỨNG ================ */

/* 📌 Khi màn hình nhỏ hơn 1024px */
@media (max-width: 1024px) {
  .title {
    font-size: 2.5rem;
  }
  .caption {
    font-size: 1rem;
  }
  .form-container {
    width: 300px;
  }
}

/* 📌 Khi màn hình nhỏ hơn 768px (Tablet & Mobile) */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
  }

  .left-section,
  .right-section {
    flex: none;
    width: 100%;
    padding: 20px;
  }

  .title {
    font-size: 2rem;
  }
  .caption {
    font-size: 1rem;
  }

  .form-container {
    width: 100%;
    max-width: 350px;
  }
}

/* 📌 Khi màn hình nhỏ hơn 480px (Mobile nhỏ) */
@media (max-width: 480px) {
  .title {
    font-size: 1.8rem;
  }
  .caption {
    font-size: 0.9rem;
  }
  .btn_login {
    width: 150px;
    font-size: 0.9em;
  }
}
</style>
