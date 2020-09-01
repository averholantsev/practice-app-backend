const router = require("express").Router();
const { orderStatusesController } = require("../controllers");

router.get("/order-statuses", orderStatusesController.getAllOrderStatuses);
router.get("/order-statuses/:id", orderStatusesController.getOneOrderStatus);
router.post("/order-statuses", orderStatusesController.postOrderStatus);
router.put("/order-statuses/:id", orderStatusesController.updateOrderStatus);
router.delete("/order-statuses/:id", orderStatusesController.deleteOrderStatus);

module.exports = router;