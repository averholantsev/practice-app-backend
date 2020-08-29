const { orderStatusesController } = require("../controllers");

exports.routesConfig = function (app) {
  app.get("/order-statuses", orderStatusesController.getAllOrderStatuses);
  app.get("/order-statuses/:id", orderStatusesController.getOneOrderStatus);
  app.post("/order-statuses", orderStatusesController.postOrderStatus);
  app.put("/order-statuses/:id", orderStatusesController.updateOrderStatus);
  app.delete("/order-statuses/:id", orderStatusesController.deleteOrderStatus);
};
