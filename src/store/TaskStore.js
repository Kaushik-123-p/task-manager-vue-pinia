import { defineStore } from "pinia"


export const useTaskStore =  defineStore('taskStore', {
    state : () => ({
        tasks : [
            {id:1, title:"buy milk", isFav:false},
            {id:2, title:"buy bread", isFav:true},
            {id:3, title:"buy eggs", isFav:false},
            {id:4, title:"buy cheese", isFav:true},
            {id:5, title:"buy butter", isFav:false},
        ],
    }),

    getters:{
        favs(){
            return this.tasks.filter(task => task.isFav)
        },

        favCount(){
            return this.tasks.reduce((acc, task) => {
                return task.isFav ? acc + 1 : acc
            }, 0)
        },

        totalCount  : (state) => {
            return state.tasks.length
        }
    },

    actions: {
        addTask(task){
            return this.tasks.push(task)
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(task => {
                return task.id !== id
            })
        },
        toggleFav(id) {
            const task = this.tasks.find(task => task.id === id)
            task.isFav = !task.isFav
        }
    }
})