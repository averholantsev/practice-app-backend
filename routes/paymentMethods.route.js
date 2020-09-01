const router = require("express").Router();
const { paymentMethodsController } = require("../controllers");

router.get("/payment-methods", paymentMethodsController.getAllPaymentMethods);
router.get("/payment-methods/:id", paymentMethodsController.getOnePaymentMethod);
router.post("/payment-methods", paymentMethodsController.postPaymentMethod);
router.put("/payment-methods/:id", paymentMethodsController.updatePaymentMethod);
router.delete(
  "/payment-methods/:id",
  paymentMethodsController.deletePaymentMethod
);

module.exports = router;
