<template>
  <div class="example-container">
    <h1>Vue Parking Table Demo</h1>
    <ParkingTable />
  </div>
</template>

<script>
import ParkingTable from "./components/ParkingTable.vue";

export default {
  name: "ParkingTableExample",
  components: {
    ParkingTable,
  },
};
</script>

<style scoped>
.example-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
