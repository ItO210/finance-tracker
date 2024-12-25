const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController");

router.post("/card", cardController.createCard);
router.get("/card/:id", cardController.getCardById);
router.get("/cards", cardController.getAllCards);
router.put("/card/:id", cardController.updateCardById);
router.delete("/card/:id", cardController.deleteCardById);

module.exports = router;
