import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    loading: false,
  }),

  getters: {
    favs() {
      return this.tasks.filter((task) => task.isFav);
    },

    favCount() {
      return this.tasks.reduce((acc, task) => {
        return task.isFav ? acc + 1 : acc;
      }, 0);
    },

    totalCount: (state) => {
      return state.tasks.length;
    },
  },

  actions: {
    async getTasks() {
      this.loading = true;

      setTimeout(async () => {
        const res = await fetch("http://localhost:3000/tasks");
        const data = await res.json();

        this.tasks = data;
        this.loading = false;
      }, 1000);
    },
    addTask(task) {
      return this.tasks.push(task);
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => {
        return task.id !== id;
      });
    },
    toggleFav(id) {
      const task = this.tasks.find((task) => task.id === id);
      task.isFav = !task.isFav;
    },
  },
});
