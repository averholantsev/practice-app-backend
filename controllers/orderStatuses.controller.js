const pool = require("../db");
const { selectOrderStatuses, selectOrderStatusById } = require("./utilities");

// get all OrderStatuses
exports.getAllOrderStatuses = async (req, res) => {
  try {
    res.json(await selectOrderStatuses());
  } catch (error) {
    res.json(error.message);
  }
};

// get an OrderStatus
exports.getOneOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await selectOrderStatusById(id));
  } catch (error) {
    res.json(error.message);
  }
};

// create an OrderStatus
exports.postOrderStatus = async (req, res) => {
  try {
    const { name } = req.body;
    const newOrderStatus = await pool.query(
      'INSERT INTO public."OrderStatuses" (id, name, "createdAt") VALUES (uuid_generate_v4(), $1, current_timestamp) RETURNING *',
      [name]
    );

    res.json(newOrderStatus.rows[0]);
  } catch (error) {
    res.json(error.message);
  }
};

// update an OrderStatus
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateOrderStatus = await pool.query(
      'UPDATE public."OrderStatuses" SET name = $1, "updatedAt" = current_timestamp WHERE id = $2',
      [name, id]
    );

    res.json(`OrderStatus ${id} was updated`);
  } catch (error) {
    res.json(error.message);
  }
};

// delete an OrderStatus
exports.deleteOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteOrderStatus = await pool.query(
      'DELETE FROM public."OrderStatuses" WHERE id = $1',
      [id]
    );

    res.json(`OrderStatus ${id} was successfully deleted`);
  } catch (error) {
    res.json(error.message);
  }
};
