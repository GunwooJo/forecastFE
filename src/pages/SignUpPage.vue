<script lang="ts">
import {defineComponent} from 'vue'
import axios from "axios";

export default defineComponent({
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      valid: false,
      emailRules: [
        (v: string) => !!v || '이메일을 입력해주세요.',
        (v: string) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || '올바른 이메일 형식이 아니에요.',
      ],
      passwordRules: [
        (v: string) => !!v || '비밀번호를 입력해주세요.',
        (v: string) => /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(v) || '비밀번호는 영문, 숫자, 특수문자를 포함한 8~15자로 구성해주세요.'
      ],
      passwordConfirmRules: [
        (v: string) => !!v || '비밀번호 확인 칸에 입력해주세요.',
        (v:string) => (v === this.password) || "비밀번호가 일치하지 않습니다."
      ],
    };
  },
  methods: {
    async signUp() {
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/join`, {
          email: this.email,
          password: this.password,
        });

        alert("회원가입에 성공했어요!");
        this.$router.push('/');
      } catch (error) {
        console.error(error);

        if(axios.isAxiosError(error) && error.response) {
          // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답한 경우.
          if (error.response.status === 409) {
            alert('이미 사용 중인 이메일이에요. 다른 이메일을 사용해주세요.');

          } else if(error.response.status === 500) {
            alert('서버 에러가 발생했어요.');

          } else {
            alert('에러가 발생했어요. 잠시 후 다시 시도해주세요.');
          }

        } else {
          alert('문제가 발생했어요. 잠시 후 다시 시도해주세요.');
        }
      }

    }
  }
})
</script>

<template>
  <v-form v-model="valid" @submit.prevent="signUp">
    <v-container>
      <h2>회원가입</h2>
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

      <v-row>
        <v-col
            cols="12"
            md="4"
        >
          <v-text-field
              v-model="passwordConfirm"
              :counter="15"
              :rules="passwordConfirmRules"
              type="password"
              label="비밀번호 확인"
              required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-btn type="submit" :disabled="!valid">회원가입</v-btn>
    </v-container>
  </v-form>
</template>

<style scoped>

</style>