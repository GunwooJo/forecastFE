<template>
  <div>
    <h2>로그인</h2>
    <form @submit.prevent="login">
      <v-form v-model="valid">
        <v-container>
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
        </v-container>

        <v-btn type="submit" :disabled="!valid">로그인</v-btn>
      </v-form>
    </form>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

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
        (v: string) => !!v || '비밀번호를 입력해주세요.',
        (v: string) => /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(v) || '비밀번호는 영문, 숫자, 특수문자를 포함한 8~15자로 구성해주세요.'
      ]
    };
  },
  methods: {
    login() {
      alert('로그인 완료')
      console.log(this.email, this.password);
      // 로그인 API 호출 등 로그인 로직 구현
      // 성공 시 this.$router.push('/home') 등으로 페이지 이동
    }
  }
});
</script>