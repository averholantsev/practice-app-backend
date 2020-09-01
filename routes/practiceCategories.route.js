const router = require("express").Router();
const { practiceCategoriesController } = require("../controllers");

router.get(
  "/practice-categories",
  practiceCategoriesController.getAllPracticeCategories
);
router.get(
  "/practice-categories/:id",
  practiceCategoriesController.getOnePracticeCategory
);
router.post(
  "/practice-categories",
  practiceCategoriesController.postPracticeCategory
);
router.put(
  "/practice-categories/:id",
  practiceCategoriesController.updatePracticeCategory
);
router.delete(
  "/practice-categories/:id",
  practiceCategoriesController.deletePracticeCategory
);

module.exports = router;
