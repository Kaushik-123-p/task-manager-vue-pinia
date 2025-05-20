<template>
  <form
    @submit.prevent="submitTask"
    class="max-w-screen-sm my-2 mx-auto grid grid-cols-[3fr_1fr] gap-3"
  >
    <input
      type="text"
      placeholder="i need to add ..."
      v-model="newTask"
      class="p-3 rounded-lg text-gray-500 text-lg w-80 sm:w-full"
    />
    <button
      class="bg-yellow-400 p-3 font-semibold rounded-lg cursor-pointer text-lg"
    >
      Add
    </button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useTaskStore } from "../store/TaskStore";
export default {
  setup() {
    const taskStore = useTaskStore();

    const newTask = ref("");

    const submitTask = () => {
      if (newTask.value.length > 0) {
        taskStore.addTask({
          id: Math.floor(Math.random() * 10000),
          title: newTask.value,
          isFav: false,
        }),
          (newTask.value = "");
      }
    };

    return { submitTask, newTask };
  },
};
</script>
