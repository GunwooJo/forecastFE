<script lang="ts">
  interface Region {
    name: string;
    xPos: number;
    yPos: number;
  }

  export default {
    props: {
      regions: {
        type: Array as () => Region[],
        required: true
      }
    },
    data() {
      return {
        searchQuery: '',
        filteredRegions: [] as Region[]
      };
    },
    watch: {
      // 검색어가 변경될 때마다 호출되는 메서드
      searchQuery(query: string): void {

        if (!query) {
          this.filteredRegions = []; // 검색어가 없으면 결과 초기화
          return;
        }

        const refinedQuery = query.split(' ').join('');
        this.filteredRegions = this.regions.filter(region => region.name.includes(refinedQuery))
      }
    },
    methods: {
      //날씨 데이터 요청
      getForecastData(regionName: string):void {
        alert(`${regionName}으로 날씨 데이터 요청!`)
      }
    }
  }
</script>

<template>
  <div class="header">
    <div id="main_logo">
      <img id="weather_icon" src="../assets/weatherIcon.png">
      <h1 id="title">날씨알리미</h1>
    </div>

    <div class="search-container">
      <v-text-field
          v-model="searchQuery"
          label="지역 검색"
      ></v-text-field>
      <v-list v-if="filteredRegions.length > 0" class="search-results">
        <v-list-item
            v-for="region in filteredRegions"
            :key="region.name"
            @click="getForecastData(region.name)"
        >
          {{ region.name }}
        </v-list-item>
      </v-list>
    </div>


    <div>로그인</div>
  </div>
</template>

<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    padding: 0 100px;
  }

  .header > #main_logo > #weather_icon {
    width: 40px;
  }

  .header > #main_logo {
    display: flex;
    align-items: center;
  }

  .header > #main_logo > #title {
    margin-left: 5px;
  }

  .search-container {
    position: relative; /* 검색 결과를 v-text-field 아래에 배치하기 위한 기준 설정 */
    width: 500px;
  }

  .search-results {
    position: absolute;
    top: 100%; /* v-text-field 바로 아래에 위치 */
    left: 0;
    width: 100%;
    z-index: 10; /* 다른 요소 위에 표시되도록 설정 */
    background-color: white; /* 배경색 설정 */
    border: 1px solid #ccc; /* 테두리 설정 */
  }
</style>