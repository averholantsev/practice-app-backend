const { practiceLanguagesController } = require("../controllers");

exports.routesConfig = function (app) {
  app.get(
    "/practice-languages",
    practiceLanguagesController.getAllPracticeLanguages
  );
  app.get(
    "/practice-languages/:id",
    practiceLanguagesController.getOnePracticeLanguage
  );
  app.post(
    "/practice-languages",
    practiceLanguagesController.postPracticeLanguage
  );
  app.put(
    "/practice-languages/:id",
    practiceLanguagesController.updatePracticeLanguage
  );
  app.delete(
    "/practice-languages/:id",
    practiceLanguagesController.deletePracticeLanguage
  );
};
