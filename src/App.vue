<template>
  <div>
      <main>

        <!-- header -->
        <header class="text-center bg-gray-200 pt-5 flex justify-center  items-center">
          <h1 class="text-4xl font-bold pt-10 pb-5 text-gray-500">Task Manager</h1>
          <!-- <h1>{{ taskStore.name }}</h1>   -->
        </header>


        <!-- filter -->
         <nav class="filter max-w-screen-md my-7 mx-auto p-2 text-center">
            <button 
              @click="filter = 'all'" 
              class="inline-block ml-3 bg-gray-200 border-2 border-gray-500 rounded-lg py-1 px-2 cursor-pointer text-lg hover:bg-gray-500 hover:text-gray-100 transition-all duration-300">
              All Tasks
            </button>
            <button 
              @click="filter = 'fav'"
               class="inline-block ml-3 bg-gray-200 border-2 border-gray-500 rounded-lg py-1 px-2 cursor-pointer text-lg hover:bg-gray-500 hover:text-gray-100 transition-all duration-300">
              Fav Tasks
            </button>
         </nav>

        <!-- task list -->

         <!-- all task -->
          <div class="task-list max-w-screen-md my-5 mx-auto" v-if="filter === 'all'">
            <p>You Have {{ taskStore.totalCount }} tasks left to do</p>
            <div v-for="task in taskStore.tasks" :key="task.id">
              <TaskDetails :task="task"/>
            </div>
          </div>

          <!-- fav task -->
          <div class="task-list max-w-screen-md my-5 mx-auto" v-if="filter === 'fav'">
            <p>You Have {{ taskStore.favCount }} fav tasks left to do</p>
            <div v-for="task in taskStore.favs" :key="task.id">
              <TaskDetails :task="task"/>
            </div>
          </div>

      </main>
  </div>
</template>

<script>
import { useTaskStore } from './store/TaskStore';
import TaskDetails from './components/TaskDetails.vue';
import { ref } from 'vue';

  export default {

    components : {TaskDetails},

    setup() {
      const taskStore  = useTaskStore()

      const filter = ref("all")

      return {taskStore, filter}
    }
  }
</script>