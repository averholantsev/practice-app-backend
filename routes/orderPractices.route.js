const { orderPracticesController } = require("../controllers");

exports.routesConfig = function (app) {
  app.get("/order-practices", orderPracticesController.getAllOrderPractices);
  app.get("/order-practices/:id", orderPracticesController.getOneOrderPractice);
  app.get("/order-practices-by-order-id/:id", orderPracticesController.getAllOrderPracticesByOrderId);
  app.post("/order-practices", orderPracticesController.postOrderPractice);
  app.put("/order-practices/:id", orderPracticesController.updateOrderPractice);
  app.delete("/order-practices/:id", orderPracticesController.deleteOrderPractice);
};
