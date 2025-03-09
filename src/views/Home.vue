<template>
  <div class="greetings">
    <h2>{{ user }}</h2>
    <h3>{{ ships }}</h3>
    <h3>{{ headquarters }}</h3>
    <h3>{{ contracts }}</h3>
  </div>
</template>

<script setup lang="ts">
import { spaceTradersController } from "@/controllers/spaceTradersController";
import type {
  GetWaypoint200Response,
  GetMyAgent200Response,
  GetContracts200Response,
  GetSystemWaypoints200Response,
} from "fizzz-spacetraders-sdk-ts";
import { computed, onMounted, ref } from "vue";

const userData = ref<GetMyAgent200Response>();
const headquartersData = ref<GetWaypoint200Response>();
const contractsData = ref<GetContracts200Response>();
const shipyardsInSystem = ref<GetSystemWaypoints200Response>();

const user = computed(() => {
  return userData.value ? userData.value.data.symbol : "Loading user...";
});

const ships = computed(() => {
  return userData.value ? `Ships: ${userData.value.data.shipCount}` : "Loading ships...";
});

const headquarters = computed(() => {
  return headquartersData.value
    ? `Headquarter coordinates: ${headquartersData.value.data.symbol}`
    : "Loading headquarters...";
});

const contracts = computed(() => {
  return contractsData.value ? `Contracts ${contractsData.value.data}` : "Loading contracts...";
});

onMounted(async () => {
  try {
    userData.value = await spaceTradersController.me();
    headquartersData.value = await spaceTradersController.getHeadquartersWaypoint();
    contractsData.value = await spaceTradersController.getContracts();

    const split = userData.value.data.headquarters.split("-");
    shipyardsInSystem.value = await spaceTradersController.getShipyardsInSystem(
      `${split[0]}-${split[1]}`,
    );
    console.log("🚀 ~ onMounted ~ shipyardsInSystem.value:", shipyardsInSystem.value);
  } catch (error) {
    console.error("Failed to load data:", error);
  }
});
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
