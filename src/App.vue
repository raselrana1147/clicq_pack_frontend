<script setup>
import {useAuth} from "@/stores/index.js";
import {storeToRefs} from "pinia";
const auth=useAuth();
const {user}=storeToRefs(auth);
import {HeaderPage,SidebarPage, FooterPage } from '@/components/';

</script>

<template>
  <div>
    <div class="wrapper">
      <!-- /.navbar -->
     <HeaderPage v-show="user.data"/>
      <!-- Main Sidebar Container -->
      <SidebarPage v-show="user.data"/>

      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">

        <section class="content">
          <div class="container-fluid">
<!--            <router-view/>-->
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </section>
      </div>

      <!-- /.content-wrapper -->
      <FooterPage v-show="user.data"/>

      <!-- Control Sidebar -->
      <aside class="control-sidebar control-sidebar-dark">
        <!-- Control sidebar content goes here -->
      </aside>
      <!-- /.control-sidebar -->
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
