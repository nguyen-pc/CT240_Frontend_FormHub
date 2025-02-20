<template>
    <div>
        <router-link to="/main/project/form">
            <button>Xem khảo sát</button>
        </router-link>
        <SurveyComponent/>
    </div>
</template>
<script>
import SurveyComponent from "../components/Survey.vue";
export default {
    name: "ProjectPage",
    component: SurveyComponent
};
</script>
