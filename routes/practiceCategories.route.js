const { practiceCategoriesController } = require("../controllers");

exports.routesConfig = function (app) {
  app.get(
    "/practice-categories",
    practiceCategoriesController.getAllPracticeCategories
  );
  app.get(
    "/practice-categories/:id",
    practiceCategoriesController.getOnePracticeCategory
  );
  app.post(
    "/practice-categories",
    practiceCategoriesController.postPracticeCategory
  );
  app.put(
    "/practice-categories/:id",
    practiceCategoriesController.updatePracticeCategory
  );
  app.delete(
    "/practice-categories/:id",
    practiceCategoriesController.deletePracticeCategory
  );
};
