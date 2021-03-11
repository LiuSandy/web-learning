<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Layout msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import Layout from '@/components/Layout/index.vue';

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    Layout,
  },
};
</script>
