const pool = require("../db");
const {
  selectPaymentMethods,
  selectPaymentMethodById,
} = require("./utilities");

// get all PaymentMethods
exports.getAllPaymentMethods = async (req, res) => {
  try {
    res.json(await selectPaymentMethods());
  } catch (error) {
    res.json(error.message);
  }
};

// get an PaymentMethod
exports.getOnePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await selectPaymentMethodById(id));
  } catch (error) {
    res.json(error.message);
  }
};

// create an PaymentMethod
exports.postPaymentMethod = async (req, res) => {
  try {
    const { name } = req.body;
    const newPaymentMethod = await pool.query(
      'INSERT INTO public."PaymentMethods" (id, name, "createdAt") VALUES (uuid_generate_v4(), $1, current_timestamp) RETURNING *',
      [name]
    );

    res.json(newPaymentMethod.rows[0]);
  } catch (error) {
    res.json(error.message);
  }
};

// update an PaymentMethod
exports.updatePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatePaymentMethod = await pool.query(
      'UPDATE public."PaymentMethods" SET name = $1, "updatedAt" = current_timestamp WHERE id = $2',
      [name, id]
    );

    res.json(`PaymentMethod ${id} was updated`);
  } catch (error) {
    res.json(error.message);
  }
};

// delete an PaymentMethod
exports.deletePaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePaymentMethod = await pool.query(
      'DELETE FROM public."PaymentMethods" WHERE id = $1',
      [id]
    );

    res.json(`PaymentMethod ${id} was successfully deleted`);
  } catch (error) {
    res.json(error.message);
  }
};
