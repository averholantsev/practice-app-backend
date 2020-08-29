const { paymentMethodsController } = require("../controllers");

exports.routesConfig = function (app) {
  app.get("/payment-methods", paymentMethodsController.getAllPaymentMethods);
  app.get("/payment-methods/:id", paymentMethodsController.getOnePaymentMethod);
  app.post("/payment-methods", paymentMethodsController.postPaymentMethod);
  app.put("/payment-methods/:id", paymentMethodsController.updatePaymentMethod);
  app.delete("/payment-methods/:id",paymentMethodsController.deletePaymentMethod);
};
