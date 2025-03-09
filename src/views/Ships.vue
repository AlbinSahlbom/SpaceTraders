<template>
  <div>
    <h2>My Ships</h2>
    <ul v-if="ships.length > 0">
      <li v-for="ship in ships" :key="ship.symbol">
        {{ ship.symbol }} - {{ ship.symbol }} (Location: {{ ship.nav.waypointSymbol }})
      </li>
    </ul>
    <p v-else>Loading ships...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { spaceTradersController } from "@/controllers/spaceTradersController";
import type { Ship } from "fizzz-spacetraders-sdk-ts";

const ships = ref<Ship[]>([]);

onMounted(async () => {
  try {
    ships.value = await spaceTradersController.getMyShips();
  } catch (error) {
    console.error("Failed to fetch ships:", error);
  }
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}
</style>
