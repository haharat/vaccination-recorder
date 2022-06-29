const express = require("express");
const {
  createRecord,
  getRecords,
  updateRecord,
  getRecord,
  deleteRecord,
  getMyRecords,
} = require("../controllers/record");
const protect = require("../middlewares/auth");
const router = express.Router();

// http://localhost:5000/api/records/
router.post("/", protect, createRecord);
// http://localhost:5000/api/records/
router.get("/", getRecords);
// http://localhost:5000/api/records/
router.get("/", protect, getMyRecords);
// http://localhost:5000/api/records/:id
router.put("/:id", protect, updateRecord);
// http://localhost:5000/api/records/:id
router.get("/:id", getRecord);
// http://localhost:5000/api/records/:id
router.delete("/:id", protect, deleteRecord);

module.exports = router;
