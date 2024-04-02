<script setup>
import {useAuth, useNotification} from "@/stores";
import { useRouter } from 'vue-router'
import {storeToRefs} from "pinia";

const notify=useNotification();
const auth=useAuth()
const {loading}=storeToRefs(auth)
const router = useRouter()

const logedOut= async () => {

  const response=await auth.LOGOUT()
 // console.log(response.status)
  if(response.status===200){
    router.push({name:'login'})
    notify.SUCCESS(response.data)
  }
}
</script>

<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4"  >
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <img src="" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">AdminLTE 3</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block"></a>
        </div>
      </div>

      <!-- SidebarSearch Form -->
      <div class="form-inline">
        <div class="input-group" data-widget="sidebar-search">
          <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
          <div class="input-group-append">
            <button class="btn btn-sidebar">
              <i class="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">


          <li class="nav-item">
            <router-link :to="{name:'dashboard'}" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              Dashboard
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name:'item.index'}" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              Item
            </router-link>
          </li>

          <li class="nav-item">
            <router-link :to="{name:'inventory.index'}" class="nav-link">
              <i class="nav-icon fas fa-th"></i>
              Inventory
            </router-link>
          </li>

          <li class="nav-item">
            <a href="javascript:;" class="nav-link" @click="logedOut">
              <i class="nav-icon fas fa-th"></i>
              Logout <span v-show="loading" class="spinner-border spinner-border-sm mr-1"></span>
            </a>
          </li>


        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>