const { filesController } = require("../controllers");

exports.routesConfig = function (app, middleware) {
  //app.get("/files", filesController.getAllFiles);
  app.get("/files/:id", filesController.getOneFile);
  app.post("/files", middleware, filesController.postFile);
  app.put("/files/:id", middleware, filesController.updateFile);
  app.delete("/files/:id", filesController.deleteFile);
};
