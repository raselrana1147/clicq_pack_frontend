<script setup>
import {useItem,useNotification} from "@/stores/index.js";
import {useRoute} from "vue-router"
import {reactive} from "vue";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";

const item=useItem();
const route=useRoute()

const {errors,loading,single_item}=storeToRefs(item);
const notify=useNotification();

const formData=reactive({
  quantity:"",
  description:"",
  name:"",
  image:null,
  id:""
})

onMounted(()=>{
  fetchData();
})

const fetchData = async () =>{
  try {
    const response = await item.SHOW_ITEM(route.params.id);
    formData.name = response.name;
    formData.quantity = response.quantity;
    formData.description = response.description;
    formData.id = response.id;

  }catch (e) {
  }
}
const handleFileUpload = (event) => {
  formData.image = event.target.files[0];
};

const submitForm= async ()=>{
  const formDataToSubmit = new FormData();
  formDataToSubmit.append('name', formData.name);
  formDataToSubmit.append('image', formData.image);
  formDataToSubmit.append('description', formData.description);
  formDataToSubmit.append('quantity', formData.quantity);
  formDataToSubmit.append('id', formData.id);
   const response= await item.EDIT_ITEM(formDataToSubmit)

  if (response.data){
    fetchData();
    notify.SUCCESS("Successfully updated")
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
          <h3 class="card-title">Item Edit</h3>
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
<!--              <input type="file" @change="handleFileUpload" class="form-control" :class="{'is-invalid' : errors.image}">-->
              <img :src="$filters.makeImagePath(single_item.image)" alt="image" class="item-image">
              <input type="file" @input="(formData.image = $event.target.files[0])" class="form-control" :class="{'is-invalid' : errors.image}">
              <span class="text-danger" v-if="errors.image">{{errors.image[0]}}</span>
            </div>

          </div>
          <!-- /.card-body -->
          <div class="card-footer">
            <button type="submit" class="btn btn-primary">Updated
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
.item-image{
  width: 60px;
  height: 40px;
}
</style>