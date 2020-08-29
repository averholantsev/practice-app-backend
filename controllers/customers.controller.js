const pool = require("../db");
const { selectCustomers, selectCustomerById } = require("./utilities");

// get all Customers
exports.getAllCustomers = async (req, res) => {
  try {
    res.json(await selectCustomers());
  } catch (error) {
    res.json(error.message);
  }
};

// get an Customer
exports.getOneCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await selectCustomerById(id));
  } catch (error) {
    res.json(error.message);
  }
};

// create an Customer
exports.postCustomer = async (req, res) => {
  try {
    const {
      type,
      firstName,
      lastName,
      phone,
      email,
      authorDescription,
      birthDate,
      userId,
    } = req.body;

    const newCustomer = await pool.query(
      'INSERT INTO public."Customers" (id, "type", "firstName", "lastName", "phone", "email", "authorDescription", "birthDate", "userId", "createdAt") VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, current_timestamp) RETURNING *',
      [
        type,
        firstName,
        lastName || null,
        phone,
        email,
        authorDescription,
        birthDate,
        userId,
      ]
    );

    res.json(newCustomer.rows[0]);
  } catch (error) {
    res.json(error.message);
  }
};

// update an Customer
exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      type,
      firstName,
      lastName,
      phone,
      email,
      authorDescription,
      birthDate,
      userId,
    } = req.body;
    const updateCustomer = await pool.query(
      'UPDATE public."Customers" SET "type" = $1, "firstName" = $2, "lastName" = $3, "phone" = $4, "email" = $5, "authorDescription" = $6, "birthDate" = $7, "userId" = $8, "updatedAt" = current_timestamp WHERE id = $9',
      [
        type,
        firstName,
        lastName || null,
        phone,
        email,
        authorDescription,
        birthDate,
        userId,
        id,
      ]
    );

    res.json(`Customer ${id} was updated`);
  } catch (error) {
    res.json(error.message);
  }
};

// delete an Customer
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCustomer = await pool.query(
      'DELETE FROM public."Customers" WHERE id = $1',
      [id]
    );

    res.json(`Customer ${id} was successfully deleted`);
  } catch (error) {
    res.json(error.message);
  }
};
