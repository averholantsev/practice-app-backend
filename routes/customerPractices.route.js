const router = require("express").Router();
const { customerPracticesController } = require("../controllers");

router.get(
  "/customer-practices",
  customerPracticesController.getAllCustomerPractices
);
router.get(
  "/customer-practices-by-customer-id/:id",
  customerPracticesController.getAllCustomerPracticesByCustomerId
);
router.get(
  "/customer-practices/:id",
  customerPracticesController.getOneCustomerPractice
);
router.post(
  "/customer-practices",
  customerPracticesController.postCustomerPractice
);
router.put(
  "/customer-practices/:id",
  customerPracticesController.updateCustomerPractice
);
router.delete(
  "/customer-practices/:id",
  customerPracticesController.deleteCustomerPractice
);

module.exports = router;
