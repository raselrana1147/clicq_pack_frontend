import { defineStore } from "pinia";
import  axiosInstance  from "@/services/axiosService";
import axios from "axios";


export const useAuth=defineStore('auth',{
    state:()=>({
        errors:{},
        user:{},
        loading:false,
        test:{}
    }),

    persist: {
        paths: ['user'],
    },

    getters:{
        getUser:(state)=>{
            return state.user?.data
        }
    },
    actions:{

        async USER_LOGIN(formData){
            this.loading=true
           // console.log(formData)
            try {
                let response = await axiosInstance.post( "/user/auth/login",formData)

               if (response.status===200){
                   this.user=response.data
                   return new Promise((resolve)=>{
                       resolve(response.data)
                   })
               }
                this.loading=true

            }catch (error){
                console.log(error)
                if (error.response.data){
                    this.errors=error.response.data.errors
                }
                this.loading=true
            }finally {
                this.loading=false
            }


        },
        async USER_REGISTER(formData){
            this.loading=true
            try {
                let response = await axiosInstance.post( "/user/auth/register",formData)
                console.log(response)
                if (response.status===200) {
                    return new Promise((resolve)=>{
                        resolve(response.data)
                    })
                }
                this.loading=false
            } catch (error) {

                if (error.response.data){
                    this.errors=error.response.data.errors
                }
                this.loading=false
            }finally {
                this.loading=false
            }
        },

        async LOGOUT(){
            this.loading=true;
            try {
                let response= await axiosInstance.post("/user/profile/logout")
               // console.log(response.data.status)
                if (response.data.status===200) {
                    this.user={}
                    return new Promise((resolve)=>{
                        resolve(response.data)
                    })
                }
            } catch (error) {
                console.log(error);
            }finally{
                this.loading=false
            }
        },
    }
})