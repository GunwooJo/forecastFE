<template>
  <div>
      <v-form v-model="valid" @submit.prevent="login">
        <v-container>
          <h2>로그인</h2>
          <v-row>
            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="이메일"
                  required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col
                cols="12"
                md="4"
            >
              <v-text-field
                  v-model="password"
                  :counter="15"
                  :rules="passwordRules"
                  type="password"
                  label="비밀번호"
                  required
              ></v-text-field>
            </v-col>
          </v-row>

          <v-btn type="submit" :disabled="!valid">로그인</v-btn>
        </v-container>
      </v-form>

  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      email: '',
      password: '',
      valid: false,
      emailRules: [
        (v: string) => !!v || '이메일을 입력해주세요.',
        (v: string) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || '올바른 이메일 형식이 아니에요.',
      ],
      passwordRules: [
        (v: string) => !!v || '비밀번호를 입력해주세요.'
      ]
    };
  },
  methods: {
    async login() {
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
          email: this.email,
          password: this.password
        });
        this.$router.push('/');

      } catch (error) {
        console.error(error);

        if(axios.isAxiosError(error) && error.response) {
          // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답한 경우.
          if (error.response.status === 400) {
            alert('존재하지 않는 사용자거나 비밀번호가 틀렸어요.');

          } else if(error.response.status === 500) {
            alert('서버 에러가 발생했어요.');

          } else {
            alert('에러가 발생했어요.');
          }

        } else {
          alert('문제가 발생했어요. 잠시 후 다시 시도해주세요.');
        }
      }
    }
  }
});
</script>