const { practiceStepsController } = require("../controllers");

exports.routesConfig = function (app) {
  app.get("/practice-steps", practiceStepsController.getAllPracticeSteps);
  app.get("/practice-steps/:id", practiceStepsController.getOnePracticeStep);
  app.get("/practice-steps-by-practice-id/:id", practiceStepsController.getAllPracticeStepsByPracticeId);
  app.post("/practice-steps", practiceStepsController.postPracticeStep);
  app.put("/practice-steps/:id", practiceStepsController.updatePracticeStep);
  app.delete("/practice-steps/:id", practiceStepsController.deletePracticeStep);
};
