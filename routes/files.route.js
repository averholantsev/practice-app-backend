const router = require("express").Router();
const multer = require("multer");
const { filesController } = require("../controllers");

let upload = multer({ dest: "src/uploads" }).single("attachment"); // Upload files

//router.get("/files", filesController.getAllFiles);
router.get("/files/:id", filesController.getOneFile);
router.post("/files", upload, filesController.postFile);
router.put("/files/:id", upload, filesController.updateFile);
router.delete("/files/:id", filesController.deleteFile);

module.exports = router;
