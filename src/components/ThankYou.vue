<!-- <template>
    <div class="thank-you-container">
        <h1>Cảm ơn bạn đã tham gia khảo sát!</h1>
        <p>Chúng tôi rất trân trọng thời gian và ý kiến của bạn.</p> -->
<!-- <button @click="goHome">Quay lại trang chủ</button> -->
<!-- </div>
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
    padding: 100px;
    font-size: 40px;
}

h1 {
    color: #4f68ce;
} -->

<!-- /* button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    margin-top: 20px;
} */

/* button:hover {
    background-color: #45a049;
} */ -->
<!-- </style> -->

<template>
    <div class="thank-you-container">
        <h1>Cảm ơn bạn đã tham gia khảo sát!</h1>
        <p>Chúng tôi rất trân trọng thời gian và ý kiến của bạn.</p>
        <!-- <button @click="goHome">Quay lại trang chủ</button> -->
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
/* Import Google Font */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

.thank-you-container {
    text-align: center;
    padding: 60px;
    font-size: 40px;
    background: #f8f9ff;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 100px auto;
    font-family: 'Roboto', sans-serif;
}

h1 {
    color: #4f68ce;
    font-size: 40px;
    margin-bottom: 10px;
}

p {
    color: #333;
    font-size: 18px;
    margin-bottom: 20px;
}

button {
    background-color: #4f68ce;
    color: white;
    border: none;
    padding: 12px 24px;
    cursor: pointer;
    font-size: 16px;
    border-radius: 8px;
    transition: background 0.3s ease, transform 0.2s ease;
}

button:hover {
    background-color: #3d57b1;
    transform: scale(1.05);
}
</style>
