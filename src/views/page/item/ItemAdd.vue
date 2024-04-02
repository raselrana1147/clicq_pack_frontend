<script setup>
import {useItem,useNotification} from "@/stores/index.js";
import {reactive} from "vue";
import {storeToRefs} from "pinia";

const item=useItem();
const {errors,loading}=storeToRefs(item);
const notify=useNotification();

const formData=reactive({
  quantity:"",
  description:"",
  name:"",
  image:null
})


const submitForm= async ()=>{
  const formDataToSubmit = new FormData();
  formDataToSubmit.append('name', formData.name);
  formDataToSubmit.append('image', formData.image);
  formDataToSubmit.append('description', formData.description);
  formDataToSubmit.append('quantity', formData.quantity);

  const response= await item.ADD_ITEM(formDataToSubmit)

  if (response.data){
    notify.SUCCESS("Successfully register")
  }
}
</script>

<template>
  <div class="row">
    <!-- left column -->
    <div class="col-md-12">
      <!-- jquery validation -->
      <div class="card mt-4" style="width: 600px; margin: 0 auto">
        <div class="card-header">
          <h3 class="card-title">Add Item</h3>
          <router-link class="btn btn-success float-right" :to="{name:'item.index'}">Back</router-link>
        </div>
        <!-- /.card-header -->
        <!-- form start -->
        <form @submit.prevent="submitForm">
          <div class="card-body">
            <div class="form-group">
              <label for="exampleInputEmail1">Name</label>
              <input type="text" v-model="formData.name" class="form-control" :class="{'is-invalid' : errors.name}">
              <span class="text-danger" v-if="errors.name">{{errors.name[0]}}</span>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Quantity</label>
              <input type="number" v-model="formData.quantity" class="form-control" :class="{'is-invalid' : errors.quantity}">
              <span class="text-danger" v-if="errors.quantity">{{errors.quantity[0]}}</span>
            </div>

            <div class="form-group">
              <label for="exampleInputPassword1">Description</label>
              <input type="text" v-model="formData.description" class="form-control" :class="{'is-invalid' : errors.description}">
              <span class="text-danger" v-if="errors.description">{{errors.description[0]}}</span>
            </div>

            <div class="form-group">
              <label>Image</label>
              <input type="file" @input="(formData.image = $event.target.files[0])" class="form-control" :class="{'is-invalid' : errors.image}">
              <span class="text-danger" v-if="errors.description">{{errors.image[0]}}</span>
            </div>

          </div>
          <!-- /.card-body -->
          <div class="card-footer">
            <button type="submit" class="btn btn-primary">Add
              <span v-show="loading" class="spinner-border spinner-border-sm mr-1"></span></button>
          </div>
        </form>
      </div>
      <!-- /.card -->
    </div>
    <!--/.col (left) -->
    <!-- right column -->
    <div class="col-md-6">

    </div>
    <!--/.col (right) -->
  </div>
</template>

<style scoped>

</style>