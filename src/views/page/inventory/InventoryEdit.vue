<script setup>
import {useItem,useNotification,useInventory} from "@/stores/index.js";
import {useRoute} from "vue-router"
import {reactive} from "vue";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";

const item=useItem();
const inventory=useInventory();
const {single_inventory,loading,errors}=storeToRefs(inventory);
const route=useRoute()
const {items}=storeToRefs(item);

const notify=useNotification();

const formData=reactive({
  item_id:"",
  description:"",
  name:"",
  id:""
})

onMounted(()=>{
  item.GET_ITEM()
  fetchData()
})

const fetchData=async ()=>{

  try {
    const response=await inventory.SHOW_INVENTORY(route.params.id)
    console.log(response.name)
    formData.name=response.name;
    formData.item_id=response.item_id;
    formData.description=response.description
    formData.id=response.id
  }catch (e){

  }
}
const submitForm= async ()=>{
  const response= await inventory.EDIT_INVENTORY(formData)

  if (response.status===200){
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
          <h3 class="card-title">Inventory Edit</h3>
          <router-link class="btn btn-success float-right" :to="{name:'inventory.index'}">Back</router-link>
        </div>

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
                <option :value="item.id" v-for="(item,index) in items" :key="index">{{item.name}}</option>
              </select>
              <span class="text-danger" v-if="errors.item_id">{{errors.item_id[0]}}</span>
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

</style>