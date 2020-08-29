const pool = require("../db");

// Select all OrderStatuses
exports.selectOrderStatuses = async () => {
  let result = await pool.query('SELECT * FROM public."OrderStatuses"');
  return result.rows;
};

// Select OrderStatus by Id
exports.selectOrderStatusById = async (id) => {
  let result = await pool.query(
    'SELECT * FROM public."OrderStatuses" WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

// Select all PracticeLanguages
exports.selectPracticeLanguages = async () => {
  let result = await await pool.query(
    'SELECT * FROM public."PracticeLanguages"'
  );
  return result.rows;
};

// Select PracticeLanguage by Id
exports.selectPracticeLanguageById = async (id) => {
  let result = await pool.query(
    'SELECT * FROM public."PracticeLanguages" WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

// Select all PaymentMethods
exports.selectPaymentMethods = async () => {
  let result = await await pool.query('SELECT * FROM public."PaymentMethods"');
  return result.rows;
};

// Select PaymentMethod by Id
exports.selectPaymentMethodById = async (id) => {
  let result = await pool.query(
    'SELECT * FROM public."PaymentMethods" WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

// Select all PracticeCategories
exports.selectPracticeCategories = async () => {
  let result = await await pool.query(
    'SELECT * FROM public."PracticeCategories"'
  );
  return result.rows;
};

// Select PracticeCategory by Id
exports.selectPracticeCategoryById = async (id) => {
  let result = await pool.query(
    'SELECT * FROM public."PracticeCategories" WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

// Select all Customers
exports.selectCustomers = async () => {
  let result = await await pool.query('SELECT * FROM public."Customers"');
  return result.rows;
};

// Select Customer by Id
exports.selectCustomerById = async (id) => {
  let result = await pool.query(
    'SELECT * FROM public."Customers" WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

// Select all Practices
exports.selectPractices = async () => {
  let result = await await pool.query('SELECT * FROM public."Practices"');
  return result.rows;
};

// Select Practice by Id
exports.selectPracticeById = async (id) => {
  let result = await pool.query(
    'SELECT * FROM public."Practices" WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

// Select all Orders
exports.selectOrders = async () => {
  let result = await await pool.query('SELECT * FROM public."Orders"');
  return result.rows;
};

// Select Order by Id
exports.selectOrderById = async (id) => {
  let result = await pool.query('SELECT * FROM public."Orders" WHERE id = $1', [
    id,
  ]);
  return result.rows[0];
};

// Select all OrderPractices
exports.selectOrderPractices = async () => {
  let result = await await pool.query('SELECT * FROM public."OrderPractices"');
  return result.rows;
};

// Select OrderPractice by Id
exports.selectOrderPracticeById = async (id) => {
  let result = await pool.query(
    'SELECT * FROM public."OrderPractices" WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

// Select OrderPractice by orderId
exports.selectOrderPracticesByOrderId = async (orderId) => {
  let result = await pool.query(
    'SELECT * FROM public."OrderPractices" WHERE "orderId" = $1',
    [orderId]
  );
  return result.rows;
};

// Select all CustomerPractices
exports.selectCustomerPractices = async () => {
  let result = await await pool.query(
    'SELECT * FROM public."CustomerPractices"'
  );
  return result.rows;
};

// Select CustomerPractice by Id
exports.selectCustomerPracticeById = async (id) => {
  let result = await pool.query(
    'SELECT * FROM public."CustomerPractices" WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

// Select CustomerPractice by customerId
exports.selectCustomerPracticesByCustomerId = async (customerId) => {
  let result = await pool.query(
    'SELECT * FROM public."CustomerPractices" WHERE "customerId" = $1',
    [customerId]
  );
  return result.rows;
};

// Select all Files
/* exports.selectFiles = async () => {
  let result = await await pool.query('SELECT * FROM public."Files"');
  return result.rows;
}; */

// Select CustomerPractice by Id
exports.selectFileById = async (id) => {
  let result = await pool.query('SELECT * FROM public."Files" WHERE id = $1', [
    id,
  ]);
  return result.rows[0];
};

// Select all PracticeSteps
exports.selectPracticeSteps = async () => {
  let result = await await pool.query(
    'SELECT * FROM public."PracticeSteps"'
  );
  return result.rows;
};

// Select CustomerPractice by Id
exports.selectPracticeStepById = async (id) => {
  let result = await pool.query(
    'SELECT * FROM public."PracticeSteps" WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

// Select PracticeSteps by practiceId
exports.selectPracticeStepsByPracticeId = async (practiceId) => {
  let result = await pool.query(
    'SELECT * FROM public."PracticeSteps" WHERE "practiceId" = $1',
    [practiceId]
  );
  return result.rows;
};