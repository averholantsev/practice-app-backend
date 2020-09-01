const router = require("express").Router();
const { practiceStepsController } = require("../controllers");

router.get("/practice-steps", practiceStepsController.getAllPracticeSteps);
router.get("/practice-steps/:id", practiceStepsController.getOnePracticeStep);
router.get(
  "/practice-steps-by-practice-id/:id",
  practiceStepsController.getAllPracticeStepsByPracticeId
);
router.post("/practice-steps", practiceStepsController.postPracticeStep);
router.put("/practice-steps/:id", practiceStepsController.updatePracticeStep);
router.delete("/practice-steps/:id", practiceStepsController.deletePracticeStep);

module.exports = router;
