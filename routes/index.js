const router = require("express").Router();

const OrderStatusesRouter = require("./orderStatuses.route");
const PaymentMethodsRouter = require("./paymentMethods.route");
const PracticeLanguagesRouter = require("./practiceLanguages.route");
const PracticeCategoriesRouter = require("./practiceCategories.route");
const CustomersRouter = require("./customers.route");
const PracticesRouter = require("./practices.route");
const OrdersRouter = require("./orders.route");
const OrderPracticesRouter = require("./orderPractices.route");
const CustomerPracticesRouter = require("./customerPractices.route");
const FilesRouter = require("./files.route");
const PracticeStepsRouter = require("./practiceSteps.route");
const ProfileRouter = require("./profile.route");


router.use("/", OrderStatusesRouter);
router.use("/", PaymentMethodsRouter);
router.use("/", PracticeLanguagesRouter);
router.use("/", PracticeCategoriesRouter);
router.use("/", CustomersRouter);
router.use("/", PracticesRouter);
router.use("/", OrdersRouter);
router.use("/", OrderPracticesRouter);
router.use("/", CustomerPracticesRouter);
router.use("/", FilesRouter);
router.use("/", PracticeStepsRouter);
router.use("/", ProfileRouter);

module.exports = router;
