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
      },
      login() {
        this.$router.push({name: 'LoginPage'});
      },
      signup() {
        this.$router.push({name: 'SignUpPage'});
      }
    }
  }
</script>

<template>
  <div class="header">
    <div id="main_logo">
      <img id="weather_icon" src="../assets/weatherIcon.png" alt="메인로고">
      <h1 id="title">날씨알리미</h1>
    </div>

    <div class="search-container">
      <v-text-field
          v-model="searchQuery"
          label="지역 검색"
          hide-details
          clearable
          dense
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

    <div class="image_container">
      <v-menu>
        <template v-slot:activator="{ props }">
          <img
              id="user_icon"
              src="../assets/userIcon.png"
              alt="회원로고"
              v-bind="props"
              style="cursor: pointer"
          />
        </template>
        <v-list>
          <v-list-item class="menu-item" @click="login">
            <v-list-item-title>로그인</v-list-item-title>
          </v-list-item>
          <v-list-item class="menu-item" @click="signup">
            <v-list-item-title>회원가입</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center; /* 헤더 요소들을 수직 중앙 정렬 */
  padding: 1rem; /* padding 값을 rem 단위로 변경 */
  width: 100%; /* 헤더 너비를 화면에 맞춰 유동적으로 변경 */
  box-sizing: border-box; /* padding 값을 content 영역에 포함 */
}

.header > #main_logo > #weather_icon {
  width: 2rem; /* 이미지 크기를 rem 단위로 변경 */
  margin-right: 0.5rem;
}

.header > #main_logo > #title {
  font-size: 1.2rem; /* 폰트 크기를 rem 단위로 변경 */
}

.search-container {
  flex-grow: 1; /* 검색 영역이 남는 공간을 모두 차지하도록 설정 */
  margin: 0 1rem; /* 검색 영역 좌우에 margin 추가 */
}

.search-results {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 10;
  background-color: white;
  border: 1px solid #ccc;
  max-height: 200px; /* 검색 결과 최대 높이 제한 */
  overflow-y: auto; /* 검색 결과가 넘칠 경우 스크롤 */
}

.image_container {
  width: 2rem; /* 이미지 크기를 rem 단위로 변경 */
}

#user_icon {
  width: 2rem;
}

.menu-item:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}

/* 미디어 쿼리를 활용한 반응형 디자인 */
@media (max-width: 600px) {
  .header {
    flex-direction: column; /* 화면이 작을 때 요소들을 세로로 배치 */
    align-items: flex-start; /* 요소들을 왼쪽 정렬 */
  }

  .search-container {
    width: 100%;
    margin: 1rem 0;
  }

  .search-results {
    position: static; /* 검색 결과 위치를 static으로 변경 */
    width: 100%;
    max-height: none; /* 검색 결과 최대 높이 제한 해제 */
  }
}
</style>