const router = require("express").Router();
const { ordersController } = require("../controllers");

router.get("/orders", ordersController.getAllOrders);
router.get("/orders/:id", ordersController.getOneOrder);
router.post("/orders", ordersController.postOrder);
router.put("/orders/:id", ordersController.updateOrder);
router.delete("/orders/:id", ordersController.deleteOrder);

module.exports = router;
