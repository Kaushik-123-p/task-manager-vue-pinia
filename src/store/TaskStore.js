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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
      const data = await res.json();

      this.tasks = data;
      this.loading = false;
    },

    async addTask(task) {
      this.tasks.push(task);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        console.log("Error with request");
      }
    },

    async deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.log("Error with request");
      }
    },

    async toggleFav(id) {
      const task = this.tasks.find((task) => task.id === id);
      task.isFav = !task.isFav;

      const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isFav: task.isFav }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        console.log("Error with request");
      }
    },
  },
});
