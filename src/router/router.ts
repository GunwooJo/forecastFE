import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from "../pages/LoginPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";
import MainPage from "../pages/MainPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'MainPage',
            component: MainPage
        },
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
