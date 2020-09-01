const router = require("express").Router();
const { customersController } = require("../controllers");

router.get("/customers", customersController.getAllCustomers);
router.get("/customers/:id", customersController.getOneCustomer);
router.post("/customers", customersController.postCustomer);
router.put("/customers/:id", customersController.updateCustomer);
router.delete("/customers/:id", customersController.deleteCustomer);

module.exports = router;
