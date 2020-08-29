const { customersController } = require("../controllers");

exports.routesConfig = function (app) {
  app.get("/customers", customersController.getAllCustomers);
  app.get("/customers/:id", customersController.getOneCustomer);
  app.post("/customers", customersController.postCustomer);
  app.put("/customers/:id", customersController.updateCustomer);
  app.delete("/customers/:id", customersController.deleteCustomer);
};
