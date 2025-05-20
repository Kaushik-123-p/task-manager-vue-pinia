<template>
  <div
    class="task py-3 px-5 bg-gray-200 mt-5 rounded-md shadow-lg flex justify-between items-center text-2xl ml-2 cursor-pointer text-gray-6 00 hover:bg-gray-500 hover:text-gray-100 transition-all duration-300 w-full border border-yellow-400"
  >
    <h3 class="inline-block">{{ task.title }}</h3>
    <div class="icons inline-block text-right text-gray-400">
      <i
        class="material-icons hover:text-gray-100 transition-all duration-300"
        @click="taskStore.deleteTask(task.id)"
        >delete</i
      >
      <i
        class="material-icons hover:text-gray-100 transition-all duration-300 active:text-red-500"
        :class="task.isFav ? 'text-red-500' : 'text-gray-400'"
        @click="taskStore.toggleFav(task.id)"
        >favorite</i
      >
    </div>
  </div>
</template>

<script>
import { useTaskStore } from "@/store/TaskStore";

export default {
  props: ["task"],

  setup() {
    const taskStore = useTaskStore();

    return { taskStore };
  },
};
</script>
