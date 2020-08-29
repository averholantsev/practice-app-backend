const { practicesController } = require("../controllers");

exports.routesConfig = function (app) {
  app.get("/practices", practicesController.getAllPractices);
  app.get("/practices/:id", practicesController.getOnePractice);
  app.post("/practices", practicesController.postPractice);
  app.put("/practices/:id", practicesController.updatePractice);
  app.delete("/practices/:id", practicesController.deletePractice);
};
