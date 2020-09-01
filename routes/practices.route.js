const router = require("express").Router();
const { practicesController } = require("../controllers");

router.get("/practices", practicesController.getAllPractices);
router.get("/practices/:id", practicesController.getOnePractice);
router.post("/practices", practicesController.postPractice);
router.put("/practices/:id", practicesController.updatePractice);
router.delete("/practices/:id", practicesController.deletePractice);

module.exports = router;
