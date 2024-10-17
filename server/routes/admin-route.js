const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const { auth } = require("../middlewares/authentication");

router.get("/member", auth, adminController.listMember);

router.patch("/member/:memberId", auth, adminController.updateMember);

router.delete("/member/:memberId", auth, adminController.removeMember);

router.get("/product", adminController.getAllProduct);

router.post("/product", adminController.createProduct);

router.put("/product/:productId", adminController.updateProduct);

router.delete("/product/:productId", adminController.deleteProduct);

module.exports = router;
