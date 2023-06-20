const express = require("express")
const router=express.Router();
const {createCustomer, addNewCard, createCharges} = require("../controllers/paymentControllers")


router.route("/api/create-customer").post(createCustomer);
router.route("/api/add-card").post(addNewCard);
router.route("/api/create-charges").post(createCharges);

module.exports = router;