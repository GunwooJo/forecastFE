<script lang="ts">
  import Header from "./components/Header.vue";
  import axios from 'axios';
  import {defineComponent} from "vue";

  interface Region {
    name: string;
    xPos: number;
    yPos: number;
  }

  export default defineComponent({
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
  })
</script>

<template>
  <Header :regions="regions"/>
  <main>
    <RouterView/>
  </main>

</template>

<style scoped>
</style>
