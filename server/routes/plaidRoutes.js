const express = require('express');
const {
  exchangeToken,
  getTransactions,
} = require("../controllers/plaidController.js");

const router = express.Router();

router.post("/exchange_token", exchangeToken);
router.get("/transactions", getTransactions);

module.exports=router;