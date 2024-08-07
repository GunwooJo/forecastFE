<script lang="ts">
  import Header from "./components/Header.vue";
  import axios from 'axios';

  interface Region {
    name: string;
    xPos: number;
    yPos: number;
  }

  export default {
    components: {Header},
    data() {
      return {
        regions: [] as Region[],
      }
    },
    mounted() {
      this.fetchRegions();
    },
    methods: {
      async fetchRegions() {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/regions`);
          console.log(response)
          this.regions = response.data.data;

        } catch(error) {
          console.error('지역 데이터를 가져오는 중 오류 발생:', error);
        }
      }
    },
  }
</script>

<template>
  <div id="app">
    <Header :regions="regions"/>
    <router-view/>
  </div>
</template>

<style scoped>
</style>
