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
      const baseURL = import.meta.env.VITE_API_URL;
      this.loading = true;
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        const res = await fetch(`${baseURL}/tasks`);
        const data = await res.json();
        this.tasks = data;
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        this.loading = false;
      }
    },

    async addTask(task) {
      const baseURL = import.meta.env.VITE_API_URL;
      this.tasks.push(task); // Optimistic UI update

      const res = await fetch(`${baseURL}/tasks`, {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        console.log("Error adding task");
      }
    },

    async deleteTask(id) {
      const baseURL = import.meta.env.VITE_API_URL;
      this.tasks = this.tasks.filter((task) => task.id !== id);

      const res = await fetch(`${baseURL}/tasks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.log("Error deleting task");
      }
    },

    async toggleFav(id) {
      const baseURL = import.meta.env.VITE_API_URL;
      const task = this.tasks.find((task) => task.id === id);
      task.isFav = !task.isFav;

      const res = await fetch(`${baseURL}/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isFav: task.isFav }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        console.log("Error toggling favorite");
      }
    },
  },
});
