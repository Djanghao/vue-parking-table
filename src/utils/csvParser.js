/**
 * Utility for parsing CSV files for parking lot designs
 */

/**
 * Parse a CSV file containing parking spot IDs
 * @param {string} csvContent - The content of the CSV file
 * @returns {Array} - 2D array of spot IDs
 */
export const parseCSV = (csvContent) => {
  if (!csvContent) {
    return [];
  }

  // Split the content by lines and remove any empty lines
  const lines = csvContent.split("\n").filter((line) => line.trim() !== "");

  // Create a 2D array to hold the spot IDs
  const spotIds = [];

  // Process each line
  for (let i = 0; i < lines.length; i++) {
    const values = lines[i].split(",").map((value) => value.trim());
    spotIds.push(values);
  }

  return spotIds;
};

/**
 * Get a spot ID from parsed CSV data if available
 * @param {Array} spotIds - 2D array of spot IDs from parseCSV
 * @param {number} row - Grid row index
 * @param {number} col - Grid column index
 * @returns {string|null} - Spot ID or null if not found
 */
export const getSpotIdFromCSV = (spotIds, row, col) => {
  if (!spotIds || !Array.isArray(spotIds) || spotIds.length === 0) {
    return null;
  }

  // Check if the row and column are within bounds
  if (
    row >= 0 &&
    row < spotIds.length &&
    col >= 0 &&
    spotIds[row] &&
    col < spotIds[row].length
  ) {
    const spotId = spotIds[row][col];
    // Return the spot ID if it's not empty
    return spotId && spotId !== "" ? spotId : null;
  }

  return null;
};
