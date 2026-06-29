const express = require("express");
const router = express.Router();

const {
  submitContact,
  getAllContacts,
  getContact,
  replyContact,
  deleteContact,
} = require("../controllers/contactController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizationMiddleware = require("../middleware/authorizationMiddleware");

router.post("/", submitContact);

router.get("/", authMiddleware, authorizationMiddleware(["admin"]), getAllContacts);
router.get("/:contactId", authMiddleware, authorizationMiddleware(["admin"]), getContact);
router.put("/:contactId/reply", authMiddleware, authorizationMiddleware(["admin"]), replyContact);
router.delete("/:contactId", authMiddleware, authorizationMiddleware(["admin"]), deleteContact);

module.exports = router;
