<template>
    <div class="task py-2 px-5 bg-gray-200 mt-5 rounded-md shadow-lg flex justify-between items-center text-2xl ml-2 cursor-pointer text-gray-600">

        <h3 class="inline-block">{{ task.title }}</h3>
        <div class="icons inline-block text-right text-gray-400">
            <i class="material-icons">delete</i>
            <i class="material-icons">favorite</i>

        </div>
    </div>
</template>

<script>
    export default {
        props :["task"]
        
    }
</script>