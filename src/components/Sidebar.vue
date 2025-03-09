<template>
  <div class="bg-dark text-white p-3 vh-100">
    <h1>Menu</h1>
    <ul class="list-unstyled">
      <li v-for="item in menuItems" :key="item.id">
        <router-link :to="item.link" class="text-white text-decoration-none">
          <h5>
            {{ item.name }}
          </h5>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface MenuItem {
  id: number;
  name: string;
  link: string;
}

const menuItems: MenuItem[] = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Ships", link: "/ships" },
  { id: 3, name: "About", link: "/about" }
  // { id: 4, name: "Contact", link: "/contact" },
];
</script>

<style scoped>
/* Add any custom styling if needed */
</style>
