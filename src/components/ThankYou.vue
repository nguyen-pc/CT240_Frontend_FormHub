<template>
    <div class="thank-you-container">
        <h1>Cảm ơn bạn đã tham gia khảo sát!</h1>
        <p>Chúng tôi rất trân trọng thời gian và ý kiến của bạn.</p>
        <button @click="goHome">Quay lại trang chủ</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
    router.push('/');
};
</script>


<style scoped>
.thank-you-container {
    text-align: center;
    padding: 20px;
}

h1 {
    color: #4CAF50;
}

button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 20px;
}

button:hover {
    background-color: #45a049;
}
</style>
