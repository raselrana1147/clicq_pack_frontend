import { defineStore } from "pinia";
import { ElNotification } from 'element-plus'

export const useNotification=defineStore('notification',{
    state:()=>({
        type:{
            success:'success',
            warning:'warning',
            info:'info',
            error:'error',
        },
        position:'top-right',
        duration:2000
    }),

    actions:{
        SUCCESS(message){
            ElNotification({
                title: 'Success',
                message: message,
                type: this.type.success,
                position: this.position,
                duration:this.duration
            })

        },


        WARNING(message){
            ElNotification({
                title: 'Warning',
                message: message,
                type: this.type.warning,
                position: this.position,
                duration:this.duration,
            })

        },

        INFO(message){
            ElNotification({
                title: 'Info',
                message: message,
                type: this.type.info,
                position: this.position,
                duration:this.duration,
            })

        },

        ERROR(message){
            ElNotification({
                title: 'Error',
                message: message,
                type: this.type.error,
                position: this.position,
                duration:this.duration
            })

        },


    }
})