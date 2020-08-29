const { ordersController } = require("../controllers");

exports.routesConfig = function (app) {
  app.get("/orders", ordersController.getAllOrders);
  app.get("/orders/:id", ordersController.getOneOrder);
  app.post("/orders", ordersController.postOrder);
  app.put("/orders/:id", ordersController.updateOrder);
  app.delete("/orders/:id", ordersController.deleteOrder);
};
