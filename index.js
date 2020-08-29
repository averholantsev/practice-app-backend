const express = require("express");
const multer = require("multer");
const app = express();
const {
  OrderStatusesRouter,
  PaymentMethodsRouter,
  PracticeLanguagesRouter,
  PracticeCategoriesRouter,
  CustomersRouter,
  PracticesRouter,
  OrdersRouter,
  OrderPracticesRouter,
  CustomerPracticesRouter,
  FilesRouter,
  PracticeStepsRouter,
} = require("./routes");

const PORT = 5000;

app.use(express.json()); // Read body
let upload = multer({ dest: "src/uploads" }).single("attachment"); // Upload files

// ROUTES //
OrderStatusesRouter.routesConfig(app);
PaymentMethodsRouter.routesConfig(app);
PracticeLanguagesRouter.routesConfig(app);
PracticeCategoriesRouter.routesConfig(app);
CustomersRouter.routesConfig(app);
PracticesRouter.routesConfig(app);
OrdersRouter.routesConfig(app);
OrderPracticesRouter.routesConfig(app);
CustomerPracticesRouter.routesConfig(app);
FilesRouter.routesConfig(app, upload);
PracticeStepsRouter.routesConfig(app, upload);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
