<script setup>
import {useAuth,useNotification} from "@/stores/index.js";
import {storeToRefs} from "pinia";
import { useRouter } from 'vue-router'
import {reactive} from "vue";

const router = useRouter()
const notify=useNotification();
const auth=useAuth();
const {errors,loading}=storeToRefs(auth);

    const form=reactive({
      email:"",
      password:"",
      name:""
    })

    const submitForm= async ()=>{
      const response= await auth.USER_REGISTER(form)
      console.log(response)
      if (response.data){
        router.push({name: 'login'})
        notify.SUCCESS("Successfully register")
      }
    }


</script>

<template>
  <div class="row">
    <div class="col-md-2"></div>
    <div class="col-md-6">
      <div class="card mt-4">
        <div class="card-body">
          <p class="login-box-msg">Sign Up</p>

          <form @submit.prevent="submitForm">
            <div class="input-group mb-3">
              <input type="text" class="form-control" v-model="form.name" placeholder="Name" :class="{'is-invalid' : errors.name}">
            </div>
            <span class="text-danger" v-if="errors.email">{{errors.name[0]}}</span>
            <div class="input-group mb-3">
              <input type="email" class="form-control" v-model="form.email" placeholder="Email" :class="{'is-invalid' : errors.email}">
            </div>
            <span class="text-danger" v-if="errors.email">{{errors.email[0]}}</span>
            <div class="input-group mb-3">
              <input type="password" class="form-control" v-model="form.password" placeholder="Password" :class="{'is-invalid' : errors.password}">
            </div>
            <span class="text-danger" v-if="errors.email">{{errors.password[0]}}</span>
            <div class="input-group mb-3">
            <button type="submit" class="btn btn-success">
              Sing Up
              <span v-show="loading" class="spinner-border spinner-border-sm mr-1"></span>
            </button>
            </div>

          </form>
          <router-link :to="{name:'login'}" class="float-right">Sign In</router-link>
        </div>
        <!-- /.login-card-body -->
      </div>
    </div>
    <div class="col-md-2 "></div>
  </div>
</template>

<style scoped>

</style>