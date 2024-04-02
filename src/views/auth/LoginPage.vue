<script setup>
import {reactive} from "vue";
import {useAuth,useNotification} from "@/stores/index.js";
import {storeToRefs} from "pinia";
import { useRouter } from 'vue-router'

const router = useRouter()
const notify=useNotification();
const auth=useAuth();
const {errors,loading}=storeToRefs(auth);

const formData=reactive({
  email:"",
  password:""
})

const submitForm=async ()=>{
 const response=await auth.USER_LOGIN(formData)

  if (response.data){
    router.push({name: 'dashboard'})

    notify.SUCCESS("Successfully Login")
  }

}
</script>

<template>
  <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-6">
        <div class="card mt-4">
          <div class="card-body">

            <p class="login-box-msg">Sign in to start your session</p>

            <form @submit.prevent="submitForm">
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Email" v-model="formData.email" :class="{'is-invalid' : errors.email}">
              </div>
              <span class="text-danger" v-if="errors.email">{{errors.email[0]}}</span>
              <div class="input-group mb-3">
                <input type="password" class="form-control" placeholder="Password" v-model="formData.password" :class="{'is-invalid' : errors.password}">
              </div>
              <span class="text-danger" v-if="errors.password">{{errors.password[0]}}</span>
              <div class="input-group mb-3">
                <button type="submit" class="btn btn-success">Login <span v-show="loading" class="spinner-border spinner-border-sm mr-1"></span></button>

              </div>
              <router-link :to="{name:'register'}" class="float-right">create an account</router-link>
            </form>

          </div>
          <!-- /.login-card-body -->
        </div>
      </div>
      <div class="col-md-2 "></div>
  </div>
</template>

