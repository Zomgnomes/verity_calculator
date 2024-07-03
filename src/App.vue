<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <div class="py-[5vh] px-[5vw]">
    <header>
      <nav>
        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-800 dark:border-gray-200 dark:text-gray-400">
          <li class="me-2">
            <RouterLink
                to="/"
                class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                activeClass="text-gray-600 bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
            >
              Outside Calculator
            </RouterLink>
          </li>
          <!--
          <li class="me-2">
            <RouterLink
                to="/inside"
                class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                activeClass="text-gray-600 bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
            >
              Inside Calculator
            </RouterLink>
          </li>
          -->
        </ul>
      </nav>
    </header>
    <RouterView
        class="text-gray-600 bg-gray-200 dark:bg-gray-800 dark:text-gray-300 rounded-b-lg"
    />
    <footer class="w-full flex justify-center">
      <a href="../legacy.html">Legacy Version</a>
    </footer>
  </div>
</template>

<style scoped>
</style>
