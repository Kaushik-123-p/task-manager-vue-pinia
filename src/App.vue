<template>
  <div>
    <main class="flex flex-col justify-center">
      <!-- header -->
      <header
        class="text-center bg-gray-200 pt-5 flex justify-center items-center"
      >
        <h1 class="text-4xl font-bold pt-10 pb-5 text-gray-500">
          Task Manager
        </h1>
        <!-- <h1>{{ taskStore.name }}</h1>   -->
      </header>

      <div class="new-task-form bg-gray-200 py-5 px-2">
        <task-form />
      </div>

      <!-- filter -->
      <nav class="filter max-w-screen-md my-7 mx-auto p-2 text-center px-2">
        <button
          @click="filter = 'all'"
          class="inline-block ml-3 bg-gray-200 border-2 border-gray-500 rounded-lg py-1 px-2 cursor-pointer text-lg hover:bg-gray-500 hover:text-gray-100 transition-all duration-300"
        >
          All Tasks
        </button>
        <button
          @click="filter = 'fav'"
          class="inline-block ml-3 bg-gray-200 border-2 border-gray-500 rounded-lg py-1 px-2 cursor-pointer text-lg hover:bg-gray-500 hover:text-gray-100 transition-all duration-300"
        >
          Fav Tasks
        </button>
      </nav>

      <!-- loading -->
      <div class="px-10">
        <div
          class="loading max-w-screen-sm rounded-lg border-2 border-yellow-500 bg-yellow-400 text-gray-600 text-xl font-semibold py-2 text-center my-7 mx-auto"
          v-if="loading"
        >
          Loading tasks...
        </div>
      </div>

      <!-- task list -->

      <!-- all task -->
      <div
        class="task-list w-96 lg:w-5/12 my-5 mx-auto pr-4"
        v-if="filter === 'all'"
      >
        <p class="px-2">You Have {{ totalCount }} tasks left to do</p>
        <div v-for="task in tasks" :key="task.id">
          <TaskDetails :task="task" />
        </div>
      </div>

      <!-- fav task -->
      <div
        class="task-list w-96 lg:w-5/12 my-5 mx-auto px-2"
        v-if="filter === 'fav'"
      >
        <p class="px-2">You Have {{ favCount }} fav tasks left to do</p>
        <div v-for="task in favs" :key="task.id">
          <TaskDetails :task="task" />
        </div>
      </div>

      <button
        @click="taskStore.$reset"
        class="max-w-screen-md my-3 mx-auto bg-yellow-400 hover:bg-yellow-500 hover:text-white py-3 px-14 font-semibold rounded-lg cursor-pointer text-lg"
      >
        RESET
      </button>
    </main>
  </div>
</template>

<script>
import { useTaskStore } from "./store/TaskStore";
import TaskDetails from "./components/TaskDetails.vue";
import { ref } from "vue";
import TaskForm from "./components/TaskForm.vue";
import { storeToRefs } from "pinia";

export default {
  components: { TaskDetails, TaskForm },

  setup() {
    const taskStore = useTaskStore();

    const { tasks, loading, favs, favCount, totalCount } =
      storeToRefs(taskStore);

    // eatch data
    taskStore.getTasks();

    const filter = ref("all");

    return { taskStore, filter, tasks, loading, favs, favCount, totalCount };
  },
};
</script>
