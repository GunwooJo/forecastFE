import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from "../pages/LoginPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/user/login',
            name: 'LoginPage',
            component: LoginPage
        },
        {
            path: '/user/signup',
            name: 'SignUpPage',
            component: SignUpPage
        }
    ]
});

export default router;
