import MyMain from "@/pages/MyMain";
import {createRouter, createWebHistory} from "vue-router";
import MyAuthorization from "@/pages/MyAuthorization";
import MyAdminPanel from "@/pages/MyAdminPanel";
import postPage from "@/pages/postPage";


const routes = [
    {
        path: '/',
        component: MyMain,
    },
    {
        path: '/login',
        component: MyAuthorization,
    },
    {
        path: '/MyAdminPanel',
        component: MyAdminPanel,
    },
    {
        path: '/posts/:_id',
        component: postPage,
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URl),
})

export default router