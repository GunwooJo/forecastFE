<template>
  <div>
    <h2>로그인</h2>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="아이디">
      <input type="password" v-model="password" placeholder="비밀번호">
      <button type="submit">로그인</button>
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    login() {
      alert('로그인 완료')
      console.log(this.username, this.password);
      // 로그인 API 호출 등 로그인 로직 구현
      // 성공 시 this.$router.push('/home') 등으로 페이지 이동
    }
  }
});
</script>