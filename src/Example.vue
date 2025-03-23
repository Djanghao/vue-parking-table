<template>
  <div class="example-container">
    <h1>Vue Parking Table Demo</h1>

    <!-- The component automatically loads default design files -->
    <div class="component-container">
      <ParkingTable />
    </div>

    <div class="example-notes">
      <h2>About This Component</h2>
      <p>
        This example demonstrates the Vue Parking Table component with
        auto-loaded design files.
      </p>
      <p>The component automatically loads:</p>
      <ul>
        <li>
          <code>parking-lot-design.csv</code> - For parking spot identifiers
        </li>
        <li>
          <code>parking-lot-design.json</code> - For grid layout configuration
        </li>
      </ul>
      <p>
        Try searching for a parking spot like "B4" or "C7" to see pathfinding in
        action!
      </p>

      <h3>Custom Designs</h3>
      <p>
        You can provide custom designs with the
        <code>customDesignJSON</code> and <code>customDesignCSV</code> props:
      </p>
      <pre><code>&lt;ParkingTable 
  :customDesignJSON="myParkingDesignJSON"
  :customDesignCSV="myParkingDesignCSV"
/&gt;</code></pre>
    </div>
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
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.component-container {
  margin: 30px 0;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.example-notes {
  margin-top: 40px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2,
h3 {
  color: #444;
  margin-top: 0;
}

h3 {
  margin-top: 20px;
}

ul {
  padding-left: 20px;
}

code,
pre {
  font-family: monospace;
  background-color: #f1f1f1;
  padding: 2px 4px;
  border-radius: 3px;
}

pre {
  padding: 12px;
  overflow-x: auto;
  margin: 10px 0;
}
</style>
