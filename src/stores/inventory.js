import { defineStore } from "pinia";
import  axiosInstance  from "@/services/axiosService";
import  axios  from 'axios';

export const useInventory=defineStore('inventory',{

    state:()=>({
        inventories:{},
        loading:false,
        errors:{},
        single_inventory:{},
        items:{},
    }),


    actions:{
        async GET_INVENTORY(){
            try {
                let response = await axiosInstance.get("/user/inventory")
                if (response.status===200) {
                    this.inventories=response.data.data
                    return new Promise((resolve)=>{
                        resolve(response.data)
                    })
                }
            } catch (error) {

                if(error.response.data){
                    console.log(error.response.data);
                }
            }
        },

        async ADD_INVENTORY(formData){
            this.loading=true
            try {
                let response = await axiosInstance.post("/user/inventory/store",formData)
                console.log(response)
                if (response.status===200) {
                    return new Promise((resolve)=>{
                        resolve(response.data)
                    })
                }
                this.loading=false
            } catch (error) {

                console.log(error)
                if (error.response.data){
                    this.errors=error.response.data.errors
                }
                this.loading=false
            }finally {
                this.loading=false
            }
        },


        async SHOW_INVENTORY(id){
            try {
                let response = await axiosInstance.get(`/user/inventory/show/${id}`)
                if (response.status===200) {
                    this.single_inventory=response.data.data
                    return response.data?.data
                }
            } catch (error) {

                if(error.response.data){
                    console.log(error.response.data);
                }
            }
        },


        async EDIT_INVENTORY(formData){
            this.loading=true
            try {
                let response = await axiosInstance.post("/user/inventory/update",formData)
                console.log(response.status)
                if (response.status===200) {
                    return new Promise((resolve)=>{
                        resolve(response.data)
                    })
                }
                this.loading=false
            } catch (error) {

                console.log(error)
                if (error.response.data){
                    this.errors=error.response.data.errors
                }
                this.loading=false
            }finally {
                this.loading=false
            }
        },

        async DELETE_INVENTORY(id){
            this.loading=true
            try {
                let response = await axiosInstance.post("/user/inventory/delete",{id:id})

                if (response.status===200) {
                    return new Promise((resolve)=>{
                        resolve(response.data)
                    })
                }
                this.loading=false
            } catch (error) {

                console.log(error)
                if (error.response.data){
                    this.errors=error.response.data.errors
                }
                this.loading=false
            }finally {
                this.loading=false
            }
        }

    }
})