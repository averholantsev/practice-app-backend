const pool = require("../db");
const {
  selectOrderPractices,
  selectOrderPracticeById,
  selectOrderPracticesByOrderId,
  selectOrderById,
  selectPracticeById,
} = require("./utilities");

// get all OrderPractices
exports.getAllOrderPractices = async (req, res) => {
  try {
    let allOrderPractices = await selectOrderPractices();
    let linkedItems = allOrderPractices.map((item) => {
      return Promise.all([
        selectOrderById(item.orderId),
        selectPracticeById(item.practiceId),
      ]);
    });

    return Promise.all(linkedItems)
      .then((data) => {
        data.forEach((item, index) => {
          allOrderPractices[index].order = item[0];
          allOrderPractices[index].practice = item[1];
        });
      })
      .then(() => {
        res.json(allOrderPractices);
      });
  } catch (error) {
    res.json(error.message);
  }
};

// get all OrderPractices by orderId
exports.getAllOrderPracticesByOrderId = async (req, res) => {
  try {
    const { id } = req.params;
    let allOrderPracticesByOrderId = await selectOrderPracticesByOrderId(id);
    let linkedItems = allOrderPracticesByOrderId.map((item) => {
      return Promise.all([
        selectOrderById(item.orderId),
        selectPracticeById(item.practiceId),
      ]);
    });

    Promise.all(linkedItems)
      .then((data) => {
        data.forEach((item, index) => {
          allOrderPracticesByOrderId[index].order = item[0];
          allOrderPracticesByOrderId[index].practice = item[1];
        });
      })
      .then(() => {
        res.json(allOrderPracticesByOrderId);
      });
  } catch (error) {
    res.json(error.message);
  }
};

// get an OrderPractice
exports.getOneOrderPractice = async (req, res) => {
  try {
    const { id } = req.params;
    let oneOrderPractice = await selectOrderPracticeById(id);
    Promise.all([
      selectOrderById(oneOrderPractice.orderId),
      selectPracticeById(oneOrderPractice.practiceId),
    ])
      .then((data) => {
        oneOrderPractice.order = data[0];
        oneOrderPractice.practice = data[1];
      })
      .then(() => {
        res.json(oneOrderPractice);
      });
  } catch (error) {
    res.json(error.message);
  }
};

// create an OrderPractice
exports.postOrderPractice = async (req, res) => {
  try {
    const { finalPrice, orderId, practiceId } = req.body;

    const newOrder = await pool.query(
      'INSERT INTO public."OrderPractices" (id, "finalPrice", "orderId", "practiceId", "createdAt") VALUES (uuid_generate_v4(), $1, $2, $3, current_timestamp) RETURNING *',
      [finalPrice, orderId, practiceId]
    );

    res.json(newOrder.rows[0]);
  } catch (error) {
    res.json(error.message);
  }
};

// update an OrderPractice
exports.updateOrderPractice = async (req, res) => {
  try {
    const { id } = req.params;
    const { finalPrice, orderId, practiceId } = req.body;
    const updateOrder = await pool.query(
      'UPDATE public."OrderPractices" SET "finalPrice" = $1, "orderId" = $2, "practiceId" = $3, "updatedAt" = current_timestamp WHERE id = $4',
      [finalPrice, orderId, practiceId, id]
    );

    res.json(`OrderPractice ${id} was updated`);
  } catch (error) {
    res.json(error.message);
  }
};

// delete an OrderPractice
exports.deleteOrderPractice = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteOrder = await pool.query(
      'DELETE FROM public."OrderPractices" WHERE id = $1',
      [id]
    );

    res.json(`OrderPractice ${id} was successfully deleted`);
  } catch (error) {
    res.json(error.message);
  }
};
