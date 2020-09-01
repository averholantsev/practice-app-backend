const router = require("express").Router();
const { orderPracticesController } = require("../controllers");

router.get("/order-practices", orderPracticesController.getAllOrderPractices);
router.get(
  "/order-practices/:id",
  orderPracticesController.getOneOrderPractice
);
router.get(
  "/order-practices-by-order-id/:id",
  orderPracticesController.getAllOrderPracticesByOrderId
);
router.post("/order-practices", orderPracticesController.postOrderPractice);
router.put(
  "/order-practices/:id",
  orderPracticesController.updateOrderPractice
);
router.delete(
  "/order-practices/:id",
  orderPracticesController.deleteOrderPractice
);

module.exports = router;
