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
    <h2>Trang chủ</h2>
  </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>

<style scoped>
.header-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.direction{
  border-radius: 10px;
  background: linear-gradient(90deg, #4c669f, #3b5998, #192f6a);
  color: white;
  padding: 5px;
}
#logoName{
  color: blue;
}
.user-info {
  display: flex;
  align-items: center;
  font-size: 20px;
}
.user-name{
  color: black;
}
.user-avatar {
  width: 30px;
  height: 30px;
  background: red;
  border-radius: 50%;
  margin-left: 10px;
}
</style>
