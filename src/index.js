import ParkingTable from "./components/ParkingTable.vue";
import { parseCSV, getSpotIdFromCSV } from "./utils/csvParser";
import { findPath } from "./utils/pathfinding";
// Export the default design files for users who might want to access them
import defaultDesignJSON from "./assets/parking-lot-design.json";
import defaultDesignCSV from "./assets/parking-lot-design.csv?raw";

// Export the component as default
export default ParkingTable;

// Named exports for utils and default designs
export {
  parseCSV,
  getSpotIdFromCSV,
  findPath,
  defaultDesignJSON,
  defaultDesignCSV,
};

// Vue plugin installation
export const VueParkingTablePlugin = {
  install(app) {
    app.component("ParkingTable", ParkingTable);
  },
};
