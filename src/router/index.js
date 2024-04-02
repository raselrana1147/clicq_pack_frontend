// import { createRouter, createWebHashHistory } from 'vue-router'
import {createRouter,createWebHashHistory,createWebHistory} from 'vue-router';
import NProgress from 'nprogress';
import {useAuth} from "@/stores";

const routes=[
    {
        path: '/',
        name:'dashboard',
        component:()=>import('@/views/page/dashboard.vue'),
        meta: { title: "Dashboard",requiresAuth: true },
    },

    {
        path: '/item-list',
        name:'item.index',
        component:()=>import('@/views/page/item/ItemList.vue'),
        meta: { title: "Item",requiresAuth: true },
    },

    {
        path: '/item-add',
        name:'item.add',
        component:()=>import('@/views/page/item/ItemAdd.vue'),
        meta: { title: "Item add",requiresAuth: true },
    },


    {
        path: '/item-edit/:id',
        name:'item.edit',
        component:()=>import('@/views/page/item/ItemEdit.vue'),
        meta: { title: "Item Edit",requiresAuth: true },
    },


    {
        path: '/inventory-list',
        name:'inventory.index',
        component:()=>import('@/views/page/inventory/InventoryList.vue'),
        meta: { title: "inventory",requiresAuth: true },
    },

    {
        path: '/inventory-add',
        name:'inventory.add',
        component:()=>import('@/views/page/inventory/InventoryAdd.vue'),
        meta: { title: "Inventory add",requiresAuth: true },
    },

    {
        path: '/inventory-edit/:id',
        name:'inventory.edit',
        component:()=>import('@/views/page/inventory/InventoryEdit.vue'),
        meta: { title: "Inventory Edit",requiresAuth: true },
    },

    //auth page
    {
        path: '/Login',
        name:'login',
        component:()=>import('@/views/auth/LoginPage.vue'),
        meta: { title: "Login",guest:true },
    },
    {
        path: '/register',
        name:'register',
        component:()=>import('@/views/auth/SignUpPage.vue'),
        meta: { title: "Register",guest:true },
    },


]


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

const DEFAULT_TITLE= "404";


router.beforeEach((to, from, next) => {
    document.title=to.meta.title || DEFAULT_TITLE
    NProgress.start()
    const logedIn=useAuth();
    if (to.matched.some((record)=> record.meta.requiresAuth)) {
        if (!logedIn.user.meta) {
            next({name:'login'})
        }else{
            next()
        }
    }else if (to.matched.some((record)=> record.meta.guest)) {
        if (logedIn.user.meta) {
            next({name:'dashboard'})
        }else{
            next()
        }
    }
    else{
        next()
    }
})


router.afterEach(()=>{
    NProgress.done()
})

export  default router;