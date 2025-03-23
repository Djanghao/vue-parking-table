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

export default {
  name: "ParkingTable",
  setup() {
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

    // Initialize grid with empty cells
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

    // Function to load the CSV file with parking spot IDs
    const loadParkingSpotIdsFromCSV = async () => {
      try {
        // Load the CSV file from assets
        const response = await fetch("/src/assets/parking-lot-design.csv");

        if (!response.ok) {
          console.error("Failed to load CSV file:", response.statusText);
          return;
        }

        const csvContent = await response.text();
        // Parse the CSV content
        parkingSpotIds.value = parseCSV(csvContent);
        console.log("Parking spot IDs loaded from CSV:", parkingSpotIds.value);
      } catch (error) {
        console.error("Error loading parking spot IDs from CSV:", error);
      }
    };

    // Get a spot ID from the loaded CSV data
    const getSpotId = (row, col) => {
      return getSpotIdFromCSV(parkingSpotIds.value, row, col);
    };

    // Search for a parking spot and set the endpoint
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

    // Calculate path between start and end points
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

    // Load default parking lot design and set fixed start point
    const loadDefaultDesign = async () => {
      try {
        // First load the parking spot IDs from CSV
        await loadParkingSpotIdsFromCSV();

        // Load the JSON file
        const response = await fetch("/src/assets/parking-lot-design.json");

        if (!response.ok) {
          console.error("Failed to load JSON file:", response.statusText);
          return;
        }

        const designData = await response.json();

        // Initialize the grid with the loaded design
        grid.value = initializeGrid(designData.grid);

        // Set a fixed start point (for example, at the entrance)
        // You can adjust this to be wherever your fixed start point should be
        startPoint.value = { row: 18, col: 27 };

        // Reset end point and path
        endPoint.value = null;
        path.value = [];
        isPathVisible.value = false;

        console.log("Parking lot design loaded successfully");
      } catch (error) {
        console.error("Error loading parking lot design:", error);
      }
    };

    // Get cell classes
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

      // 检查是否有编号
      const hasNumber = getDisplayParkingNumber(row, col, cellState) !== null;

      // Add classes for pathfinding
      if (
        startPoint.value &&
        startPoint.value.row === row &&
        startPoint.value.col === col
      ) {
        classes.push("start-point");
        // 如果起点有编号，添加额外的类
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
        // 如果终点有编号，添加额外的类
        if (hasNumber) {
          classes.push("with-number");
        }
      }

      // 检查是否为路径的一部分（不包括起点和终点）
      if (
        isInPath(row, col) &&
        !(
          startPoint.value &&
          startPoint.value.row === row &&
          startPoint.value.col === col
        ) &&
        !(
          endPoint.value &&
          endPoint.value.row === row &&
          endPoint.value.col === col
        )
      ) {
        // 如果有编号，使用带编号的路径类
        if (hasNumber) {
          classes.push("path-with-number");
        } else {
          classes.push("path");
        }
      }

      return classes;
    };

    // Get cell styles (for path animation)
    const getCellStyles = (row, col) => {
      if (
        isInPath(row, col) &&
        !(
          startPoint.value &&
          startPoint.value.row === row &&
          startPoint.value.col === col
        ) &&
        !(
          endPoint.value &&
          endPoint.value.row === row &&
          endPoint.value.col === col
        )
      ) {
        return {
          "animation-delay": getPathAnimationDelay(row, col),
        };
      }
      return {};
    };

    // Check if a cell is in the path
    const isInPath = (row, col) => {
      return (
        isPathVisible.value &&
        path.value.some((point) => point.row === row && point.col === col)
      );
    };

    // Get the index of a cell in the path
    const getPathIndex = (row, col) => {
      return path.value.findIndex(
        (point) => point.row === row && point.col === col
      );
    };

    // Calculate animation delay for path cells
    const getPathAnimationDelay = (row, col) => {
      const pathIndex = getPathIndex(row, col);
      if (pathIndex === -1) return 0;

      const totalPathLength = path.value.length;
      if (totalPathLength <= 1) return 0;

      const delayPerCell = 0.3 / (totalPathLength - 1);
      const delay = pathIndex * delayPerCell;

      return Math.min(delay, 0.3).toFixed(3) + "s";
    };

    // Get the display number for a cell
    const getDisplayParkingNumber = (row, col, cellState) => {
      // Show parking number only for parking spaces and open areas
      if (
        cellState.type !== "parking-space" &&
        cellState.type !== "open-area"
      ) {
        return null;
      }

      // Priority order:
      // 1. Manually set number in cell state
      // 2. CSV-based parking spot ID

      if (cellState.number) {
        return cellState.number;
      } else {
        return getSpotId(row, col);
      }
    };

    // Load the default design when the component is mounted
    onMounted(() => {
      loadDefaultDesign();
    });

    return {
      grid,
      startPoint,
      endPoint,
      path,
      isPathVisible,
      spotIdToSearch,
      handleSpotSearch,
      getCellClasses,
      getCellStyles,
      getDisplayParkingNumber,
    };
  },
};
</script>

<style>
.parking-table {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.search-container {
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 400px;
}

.spot-search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.search-button {
  padding: 10px 15px;
  background-color: #673ab7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.search-button:hover {
  background-color: #5e35b1;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(30, 22px);
  grid-template-rows: repeat(20, 22px);
  gap: 1px;
  background-color: #e9ecef;
  border: 2px solid #ced4da;
  width: fit-content;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 2px;
}

.grid-cell {
  width: 22px;
  height: 22px;
  background-color: white;
  border-radius: 2px;
  position: relative;
}

.parking-space {
  background-color: #3d7edb !important;
}

.open-area {
  background-color: #a5d8ff !important;
}

.facility {
  background-color: #ffe082 !important;
}

.parking-line-h {
  border-bottom: 3px solid #333;
}

.parking-line-v {
  border-right: 3px solid #333;
}

.start-point {
  background-color: rgba(76, 175, 80, 0.7) !important;
  position: relative;
  z-index: 1;
}

.start-point::after {
  content: "S";
  position: absolute;
  top: 50%; /* 默认居中 */
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  font-size: 14px;
  z-index: 1;
}

.end-point {
  background-color: rgba(244, 67, 54, 0.7) !important;
  position: relative;
  z-index: 1;
}

.end-point::after {
  content: "E";
  position: absolute;
  top: 50%; /* 默认居中 */
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  font-size: 14px;
  z-index: 1;
}

.path {
  background-color: rgba(33, 150, 243, 0.5) !important; /* 蓝色调 */
  box-shadow: inset 0 0 0 1px rgba(25, 118, 210, 0.7); /* 添加内阴影作为边框 */
  animation: pathAppear 0.3s ease forwards;
  position: relative;
  z-index: 1;
}

.path-with-number {
  background-color: rgba(33, 150, 243, 0.5) !important; /* 蓝色调 */
  box-shadow: inset 0 0 0 1px rgba(25, 118, 210, 0.7); /* 添加内阴影作为边框 */
  animation: pathAppear 0.3s ease forwards;
  position: relative;
  z-index: 1;
}

@keyframes pathAppear {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.parking-number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 7px;
  line-height: 1;
  color: white;
  pointer-events: none;
  z-index: 2;
}

/* 当起点/终点有编号时，将标记移到上半部分 */
.start-point.with-number::after,
.end-point.with-number::after {
  top: 30%;
}

/* 当编号出现在起点或终点格子上时，将其显示在下半部分 */
.start-point.with-number .parking-number,
.end-point.with-number .parking-number {
  top: 70%;
}

@media (max-height: 700px) {
  .parking-number {
    font-size: 6px;
  }
}
</style>
