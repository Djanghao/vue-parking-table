# Vue Parking Table

A Vue 3 component for visualizing and interacting with parking lot layouts. This component allows you to display parking spaces, search for specific parking spots, and find paths between locations.

## Installation

```bash
npm install vue-parking-table
```

## Usage

### Basic Usage

```vue
<template>
  <div>
    <ParkingTable />
  </div>
</template>

<script>
import { ParkingTable } from "vue-parking-table";

export default {
  components: {
    ParkingTable,
  },
};
</script>
```

### Using as a Plugin

```js
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import { VueParkingTablePlugin } from "vue-parking-table";

const app = createApp(App);
app.use(VueParkingTablePlugin);
app.mount("#app");
```

Then in your components:

```vue
<template>
  <div>
    <ParkingTable />
  </div>
</template>
```

### Accessing Default Design Files

The default design files are also exported if you need to access or modify them:

```js
import { defaultDesignJSON, defaultDesignCSV } from "vue-parking-table";

// Now you can use these files directly
console.log(defaultDesignJSON.grid);
console.log(defaultDesignCSV);
```

## Features

- Display a parking lot grid
- Search for specific parking spots
- Highlight paths between locations
- Customizable grid dimensions
- Includes default parking lot design
- Support for custom parking data

## File Structure and Configuration

### Using Default Files (Recommended)

The component automatically loads these default files:

- `parking-lot-design.csv` - Contains the parking spot identifiers
- `parking-lot-design.json` - Contains the grid layout configuration

No additional setup is required to use these default files.

### Using Custom Files

If you want to provide your own custom parking lot design:

1. Create your own CSV file with the parking spot identifiers
2. Create your own JSON file with the grid configuration
3. Pass them to the component via props:

```vue
<template>
  <ParkingTable
    :customDesignJSON="myParkingDesignJSON"
    :customDesignCSV="myParkingDesignCSV"
  />
</template>

<script>
import { ParkingTable } from "vue-parking-table";
import myParkingDesignJSON from "./assets/my-parking-design.json";
// For CSV files, import as raw text
import myParkingDesignCSV from "./assets/my-parking-design.csv?raw";

export default {
  components: {
    ParkingTable,
  },
  data() {
    return {
      myParkingDesignJSON,
      myParkingDesignCSV,
    };
  },
};
</script>
```

### File Format

**CSV File Format**:
The CSV file should contain the grid of parking spot identifiers. Empty cells represent no identifier.

Example:

```
,,,,,,,,,,,,,,,,,,,
,,,B2,B3,B4,B5,B6,B7,B8,B9,B10,B11,B12,B13,B14,B15,B16,B17,B18
,,,B2,B3,B4,B5,B6,B7,B8,B9,B10,B11,B12,B13,B14,B15,B16,B17,B18
,,,C2,C3,C4,C5,C6,C7,C8,C9,C10,C11,C12,C13,C14,C15,C16,C17,C18
```

**JSON File Format**:
The JSON file should contain the grid configuration and optionally the start point.

Example:

```json
{
  "grid": [
    [
      { "type": "open-area", "horizontalLine": false, "verticalLine": false },
      { "type": "parking-space", "horizontalLine": true, "verticalLine": true }
      // ... more cells
    ]
    // ... more rows
  ],
  "startPoint": {
    "row": 18,
    "col": 27
  }
}
```

## API

### Props

| Prop             | Type   | Default | Description                            |
| ---------------- | ------ | ------- | -------------------------------------- |
| rows             | Number | 20      | Number of rows in the grid             |
| cols             | Number | 30      | Number of columns in the grid          |
| customDesignJSON | Object | null    | Custom JSON design (overrides default) |
| customDesignCSV  | String | null    | Custom CSV data (overrides default)    |

### Methods

| Method               | Description                            |
| -------------------- | -------------------------------------- |
| findPath(start, end) | Find path between start and end points |
| searchSpot(spotId)   | Search for a specific parking spot     |

### Events

| Event      | Description                  |
| ---------- | ---------------------------- |
| path-found | Emitted when a path is found |
| spot-found | Emitted when a spot is found |

### Exported Utilities

| Export            | Description                             |
| ----------------- | --------------------------------------- |
| parseCSV          | Function to parse CSV data              |
| getSpotIdFromCSV  | Function to get a spot ID from CSV data |
| findPath          | Function to find path between points    |
| defaultDesignJSON | The default parking lot design JSON     |
| defaultDesignCSV  | The default parking lot design CSV      |

## License

MIT
