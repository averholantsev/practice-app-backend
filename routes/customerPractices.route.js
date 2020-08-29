const { customerPracticesController } = require("../controllers");

exports.routesConfig = function (app) {
  app.get("/customer-practices", customerPracticesController.getAllCustomerPractices);
  app.get("/customer-practices-by-customer-id/:id", customerPracticesController.getAllCustomerPracticesByCustomerId);
  app.get("/customer-practices/:id", customerPracticesController.getOneCustomerPractice);
  app.post("/customer-practices", customerPracticesController.postCustomerPractice);
  app.put("/customer-practices/:id", customerPracticesController.updateCustomerPractice);
  app.delete("/customer-practices/:id", customerPracticesController.deleteCustomerPractice);
};
