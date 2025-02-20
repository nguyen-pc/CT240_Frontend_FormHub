<template>
  <div class="breadcrumb">
    <span v-for="(segment, index) in segments" :key="index">
      <router-link :to="segment.path" :class="['breadcrumb-link', { 'active': $route.path === segment.path }]">{{
        segment.name }}</router-link>
      <span class="breadcrumb-node" v-if="index < segments.length - 1"> > </span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    segments: {
      type: Array,
      required: true
    }
  }
};
</script>
<style scoped>
.breadcrumb {
  margin-top: 10px;
}

.breadcrumb-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  font-size: 30px;
  padding: 20px;
}

.breadcrumb-node {
  font-size: 30px;
}

.breadcrumb-link.active {
  color: aqua;
  font-weight: bold;
}

.breadcrumb-link:hover {
  color: pink;
}
</style>