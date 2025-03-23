import ParkingTable from "./components/ParkingTable.vue";
import { parseCSV, getSpotIdFromCSV } from "./utils/csvParser";
import { findPath } from "./utils/pathfinding";

// Export the component as default
export default ParkingTable;

// Named exports for utils
export { parseCSV, getSpotIdFromCSV, findPath };

// Vue plugin installation
export const VueParkingTablePlugin = {
  install(app) {
    app.component("ParkingTable", ParkingTable);
  },
};
