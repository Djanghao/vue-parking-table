/**
 * A* Pathfinding Algorithm Utility Functions
 */

/**
 * Manhattan distance heuristic function
 * @param {Object} a - Start point, containing row and col properties
 * @param {Object} b - End point, containing row and col properties
 * @returns {number} - Manhattan distance
 */
export const manhattanDistance = (a, b) => {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
};

/**
 * Check if a cell is passable
 * @param {Array} grid - Grid data
 * @param {number} row - Row index
 * @param {number} col - Column index
 * @param {number} rows - Total number of rows
 * @param {number} cols - Total number of columns
 * @returns {boolean} - Whether the cell is passable
 */
export const isPassable = (grid, row, col, rows, cols) => {
  // Check if out of bounds
  if (row < 0 || row >= rows || col < 0 || col >= cols) {
    return false;
  }

  const cell = grid[row][col];
  // Both open-area and parking-space should be passable if not blocked by lines
  return (
    (cell.type === "open-area" || cell.type === "parking-space") &&
    !cell.horizontalLine &&
    !cell.verticalLine
  );
};

/**
 * Check if movement is blocked by lines
 * @param {Array} grid - Grid data
 * @param {Object} current - Current node with row and col
 * @param {Object} next - Next node with row and col
 * @returns {boolean} - Whether movement is blocked by a line
 */
export const isMovementBlocked = (grid, current, next) => {
  // Moving up
  if (next.row < current.row && grid[next.row][next.col].horizontalLine) {
    return true;
  }
  // Moving down
  if (next.row > current.row && grid[current.row][current.col].horizontalLine) {
    return true;
  }
  // Moving left
  if (next.col < current.col && grid[next.row][next.col].verticalLine) {
    return true;
  }
  // Moving right
  if (next.col > current.col && grid[current.row][current.col].verticalLine) {
    return true;
  }

  return false;
};

/**
 * Get neighboring nodes
 * @param {Object} node - Current node, containing row and col properties
 * @param {Array} grid - Grid data
 * @param {number} rows - Total number of rows
 * @param {number} cols - Total number of columns
 * @returns {Array} - Array of neighboring nodes
 */
export const getNeighbors = (node, grid, rows, cols) => {
  const { row, col } = node;
  const neighbors = [];
  const directions = [
    { row: -1, col: 0 }, // Up
    { row: 0, col: 1 }, // Right
    { row: 1, col: 0 }, // Down
    { row: 0, col: -1 }, // Left
  ];

  for (const dir of directions) {
    const newRow = row + dir.row;
    const newCol = col + dir.col;

    // Check if the cell is within bounds and passable
    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
      const nextCell = grid[newRow][newCol];

      // Check if the cell type is valid
      if (nextCell.type === "open-area" || nextCell.type === "parking-space") {
        // Check if movement is blocked by a line
        const current = { row, col };
        const next = { row: newRow, col: newCol };

        if (!isMovementBlocked(grid, current, next)) {
          neighbors.push(next);
        }
      }
    }
  }

  return neighbors;
};

/**
 * A* Pathfinding Algorithm
 * @param {Object} start - Start point, containing row and col properties
 * @param {Object} end - End point, containing row and col properties
 * @param {Array} grid - Grid data
 * @param {number} rows - Total number of rows
 * @param {number} cols - Total number of columns
 * @returns {Array|null} - Path array or null (if no path exists)
 */
export const findPath = (start, end, grid, rows, cols) => {
  if (!start || !end) {
    return null;
  }

  // Validate start and end points
  const startCell = grid[start.row][start.col];
  const endCell = grid[end.row][end.col];

  // Check if start and end points are valid cell types
  if (
    !(
      (startCell.type === "open-area" || startCell.type === "parking-space") &&
      (endCell.type === "open-area" || endCell.type === "parking-space")
    )
  ) {
    return null;
  }

  // Initialize open list and closed set
  const openSet = [start];
  const closedSet = new Set();

  // For path tracing
  const cameFrom = {};

  // g-scores and f-scores
  const gScore = {};
  const fScore = {};

  // Initialize all cells' g-scores and f-scores to infinity
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = `${r}-${c}`;
      gScore[key] = Infinity;
      fScore[key] = Infinity;
    }
  }

  // Set initial scores for start point
  const startKey = `${start.row}-${start.col}`;
  gScore[startKey] = 0;
  fScore[startKey] = manhattanDistance(start, end);

  // Main loop
  while (openSet.length > 0) {
    // Find node with lowest f-score
    let lowestIndex = 0;
    for (let i = 1; i < openSet.length; i++) {
      const key = `${openSet[i].row}-${openSet[i].col}`;
      const lowestKey = `${openSet[lowestIndex].row}-${openSet[lowestIndex].col}`;
      if (fScore[key] < fScore[lowestKey]) {
        lowestIndex = i;
      }
    }

    const current = openSet[lowestIndex];
    const currentKey = `${current.row}-${current.col}`;

    // Check if reached the end point
    if (current.row === end.row && current.col === end.col) {
      // Reconstruct path
      const path = [];
      let currentPathNode = current;

      while (cameFrom[`${currentPathNode.row}-${currentPathNode.col}`]) {
        path.push(currentPathNode);
        currentPathNode =
          cameFrom[`${currentPathNode.row}-${currentPathNode.col}`];
      }

      path.push(start); // Add start point
      return path.reverse(); // Return reversed path (from start to end)
    }

    // Remove current node from open list
    openSet.splice(lowestIndex, 1);
    closedSet.add(currentKey);

    // Check neighboring nodes
    const neighbors = getNeighbors(current, grid, rows, cols);
    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.row}-${neighbor.col}`;

      // Skip evaluated neighbors
      if (closedSet.has(neighborKey)) {
        continue;
      }

      // Assume all step costs are 1
      const tentativeGScore = gScore[currentKey] + 1;

      // Check if neighbor is in open list
      const neighborInOpenSet = openSet.some(
        (node) => node.row === neighbor.row && node.col === neighbor.col
      );

      if (!neighborInOpenSet) {
        // If not in open list, add it
        openSet.push(neighbor);
      } else if (tentativeGScore >= gScore[neighborKey]) {
        // If this is not a better path, skip
        continue;
      }

      // This is the best path so far, record it!
      cameFrom[neighborKey] = current;
      gScore[neighborKey] = tentativeGScore;
      fScore[neighborKey] =
        gScore[neighborKey] + manhattanDistance(neighbor, end);
    }
  }

  // No path found
  return null;
};
