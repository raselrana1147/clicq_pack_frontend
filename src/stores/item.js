import { defineStore } from "pinia";
import  axiosInstance  from "@/services/axiosService";
import  axios  from 'axios';

export const useItem=defineStore('item',{

    state:()=>({
        items:{},
        loading:false,
        errors:{},
        item:{},
        single_item:{}
    }),

    getters:{
        getItem:(state)=>{
            return state.item
        }
    },

    actions:{
        async GET_ITEM(){
            try {
                let response = await axiosInstance.get("/user/items")
                console.log(response)
                if (response.status===200) {
                    this.items=response.data.data
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

        async ADD_ITEM(formData){
            this.loading=true
            try {
                let response = await axiosInstance.post("/user/items/store",formData)
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


        async SHOW_ITEM(id){
            try {
                let response = await axiosInstance.get(`/user/items/show/${id}`)
                //console.log(response.data)
                if (response.status===200) {
                    this.single_item=response.data.data
                    return response.data?.data;
                }
            } catch (error) {

                if(error.response.data){
                    console.log(error.response.data);
                    throw  error.response.data?.errors;
                }
            }
        },


        async EDIT_ITEM(formData){
            this.loading=true
            try {
                let response = await axiosInstance.post("/user/items/update",formData)
                console.log(formData)
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

        async DELETE_ITEM(id){
            this.loading=true
            try {
                let response = await axiosInstance.post("/user/items/delete",{id:id})

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