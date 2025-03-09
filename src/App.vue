<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-auto px-0">
        <Sidebar />
      </div>
      <div class="col">
        <div class="p-4">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
</script>

<style scoped></style>
