<script setup>
import {useItem, useNotification} from "@/stores/index.js";
import {onMounted} from "vue";
import {storeToRefs} from "pinia";

const item=useItem();
const {items,loading}=storeToRefs(item)
const notify=useNotification();

onMounted(()=>{
  item.GET_ITEM()
})

const deleteItem= async (id)=>{
  if (!window.confirm("Are Sure to delete ?")){
    return
  }else{
    const response= await item.DELETE_ITEM(id)
    item.GET_ITEM()
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
          <h3 class="card-title">Item List</h3>
          <router-link class="btn btn-success float-right" :to="{name:'item.add'}">Add New</router-link>
        </div>
        <!-- /.card-header -->
        <div class="card-body">
          <table id="example2" class="table table-bordered table-hover">
            <thead>
            <tr>
              <th>S.N</th>
              <th>Image</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in items" :key="index">
              <td>{{index+1}}</td>
              <td><img :src="$filters.makeImagePath(item.image)" alt="" class="item-image"></td>
              <td>{{item.name}}</td>
              <td>{{item.quantity}}</td>
              <td>
                <router-link :to="{name:'item.edit',params:{id:item.id}}" class="btn btn-success p-1">Edit</router-link>
                <a href="javascript:;" @click="deleteItem(item.id)" class="btn btn-danger p-1">Delete </a>
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