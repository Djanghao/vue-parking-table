<template>
  <div class="parking-table">
    <div class="search-container">
      <input
        type="text"
        class="spot-search-input"
        v-model="spotIdToSearch"
        placeholder="Enter license plate..."
        @keyup.enter="handleSpotSearch"
      />
      <button class="search-button" @click="handleSpotSearch">
        Find Route
      </button>
    </div>

    <div class="grid-container">
      <template v-for="(row, rowIndex) in grid" :key="rowIndex">
        <div
          v-for="(cellState, colIndex) in row"
          :key="`${rowIndex}-${colIndex}`"
          :class="getCellClasses(rowIndex, colIndex, cellState)"
          :style="getCellStyles(rowIndex, colIndex)"
        >
          <span
            v-if="getDisplayParkingNumber(rowIndex, colIndex, cellState)"
            class="parking-number"
          >
            {{ getDisplayParkingNumber(rowIndex, colIndex, cellState) }}
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from "vue";
import { findPath } from "../utils/pathfinding";
import { parseCSV, getSpotIdFromCSV } from "../utils/csvParser";
// Import the default parking lot design files
import defaultParkingLotDesignJSON from "../assets/parking-lot-design.json";
// CSV files need to be imported as raw text
import defaultParkingLotDesignCSV from "../assets/parking-lot-design.csv?raw";

export default {
  name: "ParkingTable",
  props: {
    // Allow overriding default files
    customDesignJSON: {
      type: Object,
      default: null,
    },
    customDesignCSV: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    // Grid dimensions
    const ROWS = 20;
    const COLS = 30;

    // State for the grid
    const grid = ref([]);
    const parkingSpotIds = ref([]);
    const startPoint = ref(null);
    const endPoint = ref(null);
    const path = ref([]);
    const isPathVisible = ref(false);
    const spotIdToSearch = ref("");

    /**
     * Initialize grid with empty cells or use provided custom grid
     * @param {Array|null} customGrid - Optional custom grid configuration
     * @returns {Array} - The initialized grid
     */
    const initializeGrid = (customGrid = null) => {
      // If a custom grid is provided and it has correct dimensions, use it
      if (
        customGrid &&
        Array.isArray(customGrid) &&
        customGrid.length === ROWS &&
        customGrid[0].length === COLS
      ) {
        return customGrid;
      }

      // Otherwise, create a default empty grid
      const newGrid = [];
      for (let r = 0; r < ROWS; r++) {
        const row = [];
        for (let c = 0; c < COLS; c++) {
          row.push({
            type: "open-area",
            horizontalLine: false,
            verticalLine: false,
          });
        }
        newGrid.push(row);
      }
      return newGrid;
    };

    /**
     * Load parking spot IDs from CSV content
     */
    const loadParkingSpotIdsFromCSV = () => {
      try {
        // Use either the custom CSV or the default imported one
        const csvContent = props.customDesignCSV || defaultParkingLotDesignCSV;

        // Parse the CSV content
        parkingSpotIds.value = parseCSV(csvContent);
        console.log("Parking spot IDs loaded from CSV:", parkingSpotIds.value);
      } catch (error) {
        console.error("Error loading parking spot IDs from CSV:", error);
      }
    };

    /**
     * Get a spot ID from the loaded CSV data
     * @param {number} row - Grid row index
     * @param {number} col - Grid column index
     * @returns {string|null} - Spot ID or null if not found
     */
    const getSpotId = (row, col) => {
      return getSpotIdFromCSV(parkingSpotIds.value, row, col);
    };

    /**
     * Search for a parking spot and set the endpoint
     */
    const handleSpotSearch = () => {
      if (!spotIdToSearch.value.trim()) return;

      // Find the spot ID in the grid or CSV data
      const spotId = spotIdToSearch.value.trim();
      const matchingCells = [];

      // First check in the manually set number property
      for (let r = 0; r < grid.value.length; r++) {
        for (let c = 0; c < grid.value[r].length; c++) {
          const cell = grid.value[r][c];
          if (cell.number === spotId) {
            matchingCells.push({ row: r, col: c });
          }
        }
      }

      // If not found in cell numbers, check in CSV data
      if (matchingCells.length === 0) {
        for (let r = 0; r < parkingSpotIds.value.length; r++) {
          if (!parkingSpotIds.value[r]) continue;

          for (let c = 0; c < parkingSpotIds.value[r].length; c++) {
            if (parkingSpotIds.value[r][c] === spotId) {
              if (r < grid.value.length && c < grid.value[r].length) {
                const cell = grid.value[r][c];
                if (
                  cell.type === "parking-space" ||
                  cell.type === "open-area"
                ) {
                  matchingCells.push({ row: r, col: c });
                }
              }
            }
          }
        }
      }

      // If a matching cell is found, set it as the endpoint
      if (matchingCells.length > 0) {
        endPoint.value = matchingCells[0];

        // If startPoint is set, calculate and show the path
        if (startPoint.value) {
          calculatePath();
          isPathVisible.value = true;
        }

        alert(`End point set to spot "${spotId}" successfully!`);
      } else {
        alert(`No spot with ID "${spotId}" found!`);
      }
    };

    /**
     * Calculate path between start and end points
     */
    const calculatePath = () => {
      if (startPoint.value && endPoint.value) {
        // Clear the path to reset animations
        path.value = [];

        // Use nextTick to ensure DOM updates before calculating new path
        nextTick(() => {
          const foundPath = findPath(
            startPoint.value,
            endPoint.value,
            grid.value,
            ROWS,
            COLS
          );
          path.value = foundPath || [];
        });
      }
    };

    /**
     * Load default parking lot design and set fixed start point
     */
    const loadDefaultDesign = () => {
      try {
        // First load the parking spot IDs from CSV
        loadParkingSpotIdsFromCSV();

        // Use either the custom JSON or the default imported one
        const designData =
          props.customDesignJSON || defaultParkingLotDesignJSON;

        // Initialize the grid with the loaded design
        grid.value = initializeGrid(designData.grid);

        // Set a fixed start point from the JSON data or use default
        if (designData.startPoint) {
          startPoint.value = designData.startPoint;
        } else {
          // Default fallback position if not specified in JSON
          startPoint.value = { row: 18, col: 27 };
        }

        // Reset end point and path
        endPoint.value = null;
        path.value = [];
        isPathVisible.value = false;

        console.log("Parking lot design loaded successfully");
      } catch (error) {
        console.error("Error loading parking lot design:", error);
      }
    };

    /**
     * Get CSS classes for a cell
     * @param {number} row - Grid row index
     * @param {number} col - Grid column index
     * @param {Object} cellState - Cell state object
     * @returns {Array} - Array of CSS class names
     */
    const getCellClasses = (row, col, cellState) => {
      const classes = ["grid-cell"];

      if (cellState.type) {
        classes.push(cellState.type);
      }

      if (cellState.horizontalLine) {
        classes.push("parking-line-h");
      }

      if (cellState.verticalLine) {
        classes.push("parking-line-v");
      }

      // Check if the cell has a number
      const hasNumber = getDisplayParkingNumber(row, col, cellState) !== null;

      // Add classes for pathfinding
      if (
        startPoint.value &&
        startPoint.value.row === row &&
        startPoint.value.col === col
      ) {
        classes.push("start-point");
        // If start point has a number, add additional class
        if (hasNumber) {
          classes.push("with-number");
        }
      }

      if (
        endPoint.value &&
        endPoint.value.row === row &&
        endPoint.value.col === col
      ) {
        classes.push("end-point");
        // If end point has a number, add additional class
        if (hasNumber) {
          classes.push("with-number");
        }
      }

      // Mark cells in the path
      if (isPathVisible.value && path.value.length > 0) {
        // Check if this cell is in the path
        const inPath = path.value.some(
          (point) => point.row === row && point.col === col
        );
        if (inPath) {
          classes.push("path-cell");
          // Determine if this is the start, end, or middle of the path
          if (path.value[0].row === row && path.value[0].col === col) {
            classes.push("path-start");
          } else if (
            path.value[path.value.length - 1].row === row &&
            path.value[path.value.length - 1].col === col
          ) {
            classes.push("path-end");
          } else {
            classes.push("path-middle");
          }
        }
      }

      return classes;
    };

    /**
     * Get CSS styles for a cell
     * @param {number} row - Grid row index
     * @param {number} col - Grid column index
     * @returns {Object} - CSS style object
     */
    const getCellStyles = (row, col) => {
      const styles = {};

      // If this cell is in the path, add a delay for animation
      if (isPathVisible.value && path.value.length > 0) {
        const pathIndex = path.value.findIndex(
          (point) => point.row === row && point.col === col
        );
        if (pathIndex >= 0) {
          // Add animation delay based on position in path
          styles.animationDelay = `${pathIndex * 0.1}s`;
        }
      }

      return styles;
    };

    /**
     * Get display parking number for a cell
     * @param {number} row - Grid row index
     * @param {number} col - Grid column index
     * @param {Object} cellState - Cell state object
     * @returns {string|null} - Parking number to display or null
     */
    const getDisplayParkingNumber = (row, col, cellState) => {
      // First check for manually set number in cell state
      if (cellState.number) {
        return cellState.number;
      }

      // If not in cell state, check in CSV data
      return getSpotId(row, col);
    };

    // Load the design on component mount
    onMounted(() => {
      loadDefaultDesign();
    });

    return {
      grid,
      parkingSpotIds,
      startPoint,
      endPoint,
      path,
      isPathVisible,
      spotIdToSearch,
      handleSpotSearch,
      calculatePath,
      getCellClasses,
      getCellStyles,
      getDisplayParkingNumber,
    };
  },
};
</script>

<style>
.parking-table {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.search-container {
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
}

.spot-search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-right: none;
  border-radius: 4px 0 0 4px;
  font-size: 14px;
}

.search-button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #388e3c;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(30, 20px);
  grid-template-rows: repeat(20, 20px);
  gap: 1px;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.grid-cell {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 9px;
  user-select: none;
}

/* Cell types */
.open-area {
  background-color: #f0f0f0;
}

.parking-space {
  background-color: #e0e0e0;
}

.facility {
  background-color: #d0d0d0;
}

/* Parking lines */
.parking-line-h::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #999;
}

.parking-line-v::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  width: 1px;
  height: 100%;
  background-color: #999;
}

/* Path highlighting */
.start-point {
  background-color: #4caf50 !important;
  color: white;
  z-index: 2;
}

.end-point {
  background-color: #f44336 !important;
  color: white;
  z-index: 2;
}

.path-cell {
  animation: pulse 1.5s infinite;
  background-color: #2196f3 !important;
  z-index: 1;
}

.path-start {
  background-color: #4caf50 !important;
}

.path-end {
  background-color: #f44336 !important;
}

.path-middle {
  background-color: #2196f3 !important;
}

/* Animation for path cells */
@keyframes pulse {
  0% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.7;
  }
}

/* Parking spot numbers */
.parking-number {
  font-size: 8px;
  font-weight: bold;
  color: #333;
}

.start-point.with-number .parking-number,
.end-point.with-number .parking-number {
  color: white;
}

@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(30, 25px);
    grid-template-rows: repeat(20, 25px);
  }

  .grid-cell {
    width: 25px;
    height: 25px;
    font-size: 11px;
  }

  .parking-number {
    font-size: 10px;
  }
}

@media (min-width: 1200px) {
  .grid-container {
    grid-template-columns: repeat(30, 30px);
    grid-template-rows: repeat(20, 30px);
  }

  .grid-cell {
    width: 30px;
    height: 30px;
    font-size: 12px;
  }

  .parking-number {
    font-size: 11px;
  }
}
</style>
