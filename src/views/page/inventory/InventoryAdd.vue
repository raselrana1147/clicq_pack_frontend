<script setup>
import {useItem,useNotification,useInventory} from "@/stores/index.js";
import {onMounted, reactive} from "vue";
import {storeToRefs} from "pinia";

const item=useItem();
const inventory=useInventory();
const {errors,loading}=storeToRefs(inventory);
const {items}=storeToRefs(item);
const notify=useNotification();

const formData=reactive({
  item_id:"",
  description:"",
  name:"",
})

onMounted(()=>{
  item.GET_ITEM()
})
const handleFileUpload = (event) => {
  formData.image = event.target.files[0];
  console.log(event.target.files[0])
};

const submitForm= async ()=>{
  const response= await inventory.ADD_INVENTORY(formData)
  console.log(response)
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
          <h3 class="card-title">Add Inventory</h3>
          <router-link class="btn btn-success float-right" :to="{name:'inventory.index'}">Back</router-link>
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
              <label for="exampleInputPassword1">Description</label>
              <input type="text" v-model="formData.description" class="form-control" :class="{'is-invalid' : errors.description}">
              <span class="text-danger" v-if="errors.description">{{errors.description[0]}}</span>
            </div>

            <div class="form-group">
              <label>Item</label>
              <select v-model="formData.item_id" class="form-control">
                <option value="">Select Item</option>
                <option :value="item.id" v-for="(item,index) in items" :key="index">{{item.name}}</option>
              </select>
              <span class="text-danger" v-if="errors.item_id">{{errors.item_id[0]}}</span>
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