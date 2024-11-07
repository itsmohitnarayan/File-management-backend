const express = require("express");
const router = express.Router();
// Import necessary controller functions
const { getInventoryItems, createInventoryItem } = require("../controllers/inventoryController");

// Define routes with proper callback functions
router.get("/items", getInventoryItems);  // Check that `getInventoryItems` is defined and imported correctly
router.post("/items", createInventoryItem);  // Check that `createInventoryItem` is defined and imported correctly

module.exports = router;
