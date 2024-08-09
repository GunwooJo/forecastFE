import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from "../pages/LoginPage.vue";
import practice from "../components/practice.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/user/login',
            name: 'LoginPage',
            component: LoginPage
        },
        {
            path: '/practice',
            name: 'PracticePage',
            component: practice
        }
    ]
});

export default router;
