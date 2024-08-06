import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from "../pages/LoginPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/user/login',
            name: 'LoginPage',
            component: LoginPage
        }
        // 다른 페이지 라우트 추가
    ]
});

export default router;
