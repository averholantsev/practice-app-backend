const pool = require("../db");
const {
  selectOrders,
  selectOrderById,
  selectCustomerById,
  selectOrderStatusById,
  selectPaymentMethodById,
} = require("./utilities");

// get all Orders
exports.getAllOrders = async (req, res) => {
  try {
    let allOrders = await selectOrders();
    let linkedItems = allOrders.map((item) => {
      return Promise.all([
        selectCustomerById(item.customerId),
        selectOrderStatusById(item.orderStatusId),
        selectPaymentMethodById(item.paymentMethodId),
      ]);
    });

    return Promise.all(linkedItems)
      .then((data) => {
        data.forEach((item, index) => {
          allOrders[index].customer = item[0];
          allOrders[index].orderStatus = item[1];
          allOrders[index].paymentMethod = item[2];
        });
      })
      .then(() => {
        res.json(allOrders);
      });
  } catch (error) {
    res.json(error.message);
  }
};

// get an Order
exports.getOneOrder = async (req, res) => {
  try {
    const { id } = req.params;
    let oneOrder = await selectOrderById(id);
    Promise.all([
      selectCustomerById(oneOrder.customerId),
      selectOrderStatusById(oneOrder.orderStatusId),
      selectPaymentMethodById(oneOrder.paymentMethodId),
    ])
      .then((data) => {
        oneOrder.customer = data[0];
        oneOrder.orderStatus = data[1];
        oneOrder.paymentMethod = data[2];
      })
      .then(() => {
        res.json(oneOrder);
      });
  } catch (error) {
    res.json(error.message);
  }
};

// create an Order
exports.postOrder = async (req, res) => {
  try {
    const {
      isShoppingCart,
      purchaseDate,
      customerId,
      orderStatusId,
      paymentMethodId,
    } = req.body;

    const newOrder = await pool.query(
      'INSERT INTO public."Orders" (id, "isShoppingCart", "purchaseDate", "customerId", "orderStatusId", "paymentMethodId", "createdAt") VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, current_timestamp) RETURNING *',
      [
        isShoppingCart,
        purchaseDate || null,
        customerId,
        orderStatusId,
        paymentMethodId,
      ]
    );

    res.json(newOrder.rows[0]);
  } catch (error) {
    res.json(error.message);
  }
};

// update an Order
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      isShoppingCart,
      purchaseDate,
      customerId,
      orderStatusId,
      paymentMethodId,
    } = req.body;
    const updateOrder = await pool.query(
      'UPDATE public."Orders" SET "isShoppingCart" = $1, "purchaseDate" = $2, "customerId" = $3, "orderStatusId" = $4, "paymentMethodId" = $5, "updatedAt" = current_timestamp WHERE id = $6',
      [
        isShoppingCart,
        purchaseDate || null,
        customerId,
        orderStatusId,
        paymentMethodId,
        id,
      ]
    );

    res.json(`Order ${id} was updated`);
  } catch (error) {
    res.json(error.message);
  }
};

// delete an Order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteOrder = await pool.query(
      'DELETE FROM public."Orders" WHERE id = $1',
      [id]
    );

    res.json(`Order ${id} was successfully deleted`);
  } catch (error) {
    res.json(error.message);
  }
};
