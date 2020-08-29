const pool = require("../db");
const {
  selectCustomerPractices,
  selectCustomerPracticeById,
  selectCustomerPracticesByCustomerId,
  selectCustomerById,
  selectPracticeById,
} = require("./utilities");

// get all CustomerPractices
exports.getAllCustomerPractices = async (req, res) => {
  try {
    let allCustomerPractices = await selectCustomerPractices();
    let linkedItems = allCustomerPractices.map((item) => {
      return Promise.all([
        selectCustomerById(item.customerId),
        selectPracticeById(item.practiceId),
      ]);
    });

    Promise.all(linkedItems)
      .then((data) => {
        data.forEach((item, index) => {
          allCustomerPractices[index].customer = item[0];
          allCustomerPractices[index].practice = item[1];
        });
      })
      .then(() => {
        res.json(allCustomerPractices);
      });
  } catch (error) {
    res.json(error.message);
  }
};

// get all CustomerPractices by orderId
exports.getAllCustomerPracticesByCustomerId = async (req, res) => {
  try {
    const { id } = req.params;
    let allCustomerPracticesByOrderId = await selectCustomerPracticesByCustomerId(
      id
    );
    let linkedItems = allCustomerPracticesByOrderId.map((item) => {
      return Promise.all([
        selectCustomerById(item.customerId),
        selectPracticeById(item.practiceId),
      ]);
    });

    Promise.all(linkedItems)
      .then((data) => {
        data.forEach((item, index) => {
          allCustomerPracticesByOrderId[index].customer = item[0];
          allCustomerPracticesByOrderId[index].practice = item[1];
        });
      })
      .then(() => {
        res.json(allCustomerPracticesByOrderId);
      });
  } catch (error) {
    res.json(error.message);
  }
};

// get an CustomerPractice
exports.getOneCustomerPractice = async (req, res) => {
  try {
    const { id } = req.params;
    let oneCustomerPractice = await selectCustomerPracticeById(id);
    Promise.all([
      selectCustomerById(oneCustomerPractice.customerId),
      selectPracticeById(oneCustomerPractice.practiceId),
    ])
      .then((data) => {
        oneCustomerPractice.customer = data[0];
        oneCustomerPractice.practice = data[1];
      })
      .then(() => {
        res.json(oneCustomerPractice);
      });
  } catch (error) {
    res.json(error.message);
  }
};

// create an CustomerPractice
exports.postCustomerPractice = async (req, res) => {
  try {
    const { isWhishItem, customerId, practiceId } = req.body;

    const newCustomerPractice = await pool.query(
      'INSERT INTO public."CustomerPractices" (id, "isWhishItem", "customerId", "practiceId", "createdAt") VALUES (uuid_generate_v4(), $1, $2, $3, current_timestamp) RETURNING *',
      [isWhishItem, customerId, practiceId]
    );

    res.json(newCustomerPractice.rows[0]);
  } catch (error) {
    res.json(error.message);
  }
};

// update an CustomerPractice
exports.updateCustomerPractice = async (req, res) => {
  try {
    const { id } = req.params;
    const { isWhishItem, customerId, practiceId } = req.body;
    const updateCustomerPractice = await pool.query(
      'UPDATE public."CustomerPractices" SET "isWhishItem" = $1, "customerId" = $2, "practiceId" = $3, "updatedAt" = current_timestamp WHERE id = $4',
      [isWhishItem, customerId, practiceId, id]
    );

    res.json(`CustomerPractice ${id} was updated`);
  } catch (error) {
    res.json(error.message);
  }
};

// delete an CustomerPractice
exports.deleteCustomerPractice = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCustomerPractice = await pool.query(
      'DELETE FROM public."CustomerPractices" WHERE id = $1',
      [id]
    );

    res.json(`CustomerPractice ${id} was successfully deleted`);
  } catch (error) {
    res.json(error.message);
  }
};
