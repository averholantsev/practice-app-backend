const router = require("express").Router();
const { practiceLanguagesController } = require("../controllers");

router.get(
  "/practice-languages",
  practiceLanguagesController.getAllPracticeLanguages
);
router.get(
  "/practice-languages/:id",
  practiceLanguagesController.getOnePracticeLanguage
);
router.post(
  "/practice-languages",
  practiceLanguagesController.postPracticeLanguage
);
router.put(
  "/practice-languages/:id",
  practiceLanguagesController.updatePracticeLanguage
);
router.delete(
  "/practice-languages/:id",
  practiceLanguagesController.deletePracticeLanguage
);

module.exports = router;
