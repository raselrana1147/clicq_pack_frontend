<script setup>
import {useInventory, useNotification} from "@/stores/index.js";
import {onMounted} from "vue";
import {storeToRefs} from "pinia";

const inventory=useInventory();
const {inventories,loading}=storeToRefs(inventory)
const notify=useNotification();

onMounted(()=>{
  inventory.GET_INVENTORY()
})

const deleteInventory= async (id)=>{
  if (!window.confirm("Are Sure to delete ?")){
    return
  }else{
    const response= await inventory.DELETE_INVENTORY(id)
    inventory.GET_INVENTORY()
    console.log(response)
    if (response.status===200){
      notify.SUCCESS("Successfully Deleted")
    }
  }
}
</script>

<template>
  <div class="row">
    <div class="col-12">
      <div class="card mt-4">
        <div class="card-header">
          <h3 class="card-title">Inventory List</h3>
          <router-link class="btn btn-success float-right" :to="{name:'inventory.add'}">Add New</router-link>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <table id="example2" class="table table-bordered table-hover">
            <thead>
            <tr>
              <th>S.N</th>
              <th>Name</th>
              <th>Description</th>
              <th>Username</th>
              <th>Item Name</th>
              <th>Item Image</th>
              <th>Item Qty</th>
              <th>Item Description</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(inventory,index) in inventories" :key="index">
              <td>{{index+1}}</td>

              <td>{{inventory.name}}</td>
              <td>{{inventory.description}}</td>
              <td>{{inventory.user}}</td>
              <td>{{inventory.item.name}}</td>
              <td><img :src="$filters.makeImagePath(inventory.item.image)" alt="" class="item-image"></td>
              <td>{{inventory.item.quantity}}</td>
              <td>{{inventory.item.description}}</td>
              <td>
                <router-link :to="{name:'inventory.edit',params:{id:inventory.id}}" class="btn btn-success p-1">Edit</router-link>
                <a href="javascript:;" @click="deleteInventory(inventory.id)" class="btn btn-danger p-1">Delete </a>
              </td>
            </tr>
            </tbody>

          </table>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->
      <!-- /.card -->
    </div>
    <!-- /.col -->
  </div>
</template>

<style scoped>
.item-image{
  width: 50px;
  height: 40px;
}
</style>