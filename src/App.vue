<template>
  <div>
      <main>

        <!-- header -->
        <header class="text-center bg-gray-200 pt-5 flex justify-center  items-center">
          <h1 class="text-4xl font-bold pt-10 pb-5 text-gray-500">Task Manager</h1>
          <!-- <h1>{{ taskStore.name }}</h1>   -->
        </header>

        <!-- task list -->
         <div class="task-list max-w-screen-md my-5 mx-auto" v-for="task in taskStore.tasks" :key="task.id">
            <TaskDetails :task="task"/>
         </div>

      </main>
  </div>
</template>

<script>
import { useTaskStore } from './store/TaskStore';
import TaskDetails from './components/TaskDetails.vue';

  export default {

    components : {TaskDetails},

    setup() {
      const taskStore  = useTaskStore()

      return {taskStore}
    }
  }
</script>