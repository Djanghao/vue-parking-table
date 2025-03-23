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

## Features

- Display a parking lot grid
- Search for specific parking spots
- Highlight paths between locations
- Customizable grid dimensions
- Support for loading parking spot data from CSV

## API

### Props

| Prop    | Type   | Default | Description                                   |
| ------- | ------ | ------- | --------------------------------------------- |
| rows    | Number | 20      | Number of rows in the grid                    |
| cols    | Number | 30      | Number of columns in the grid                 |
| csvPath | String | null    | Path to CSV file containing parking spot data |

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

## License

MIT
