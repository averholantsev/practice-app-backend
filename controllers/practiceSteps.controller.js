const pool = require("../db");
const {
  selectPracticeSteps,
  selectPracticeStepById,
  selectPracticeStepsByPracticeId,
  selectPracticeById,
  selectFileById,
} = require("./utilities");

// get all PracticeSteps
exports.getAllPracticeSteps = async (req, res) => {
  try {
    let allPracticeSteps = await selectPracticeSteps();
    let linkedItems = allPracticeSteps.map((item) => {
      return Promise.all([
        selectPracticeById(item.practiceId),
        selectFileById(item.fileId),
      ]);
    });

    Promise.all(linkedItems)
      .then((data) => {
        data.forEach((item, index) => {
          allPracticeSteps[index].practice = item[0];
          allPracticeSteps[index].file = item[1];
        });
      })
      .then(() => {
        res.json(allPracticeSteps);
      });
  } catch (error) {
    res.json(error.message);
  }
};

// get an PracticeStep
exports.getOnePracticeStep = async (req, res) => {
  try {
    const { id } = req.params;
    let onePracticeStep = await selectPracticeStepById(id);
    Promise.all([
      selectPracticeById(onePracticeStep.practiceId),
      selectFileById(onePracticeStep.fileId),
    ])
      .then((data) => {
        onePracticeStep.practice = data[0];
        onePracticeStep.file = data[1];
      })
      .then(() => {
        res.json(onePracticeStep);
      });
  } catch (error) {
    res.json(error.message);
  }
};

// get all PracticeSteps by practiceId
exports.getAllPracticeStepsByPracticeId = async (req, res) => {
  try {
    const { id } = req.params;
    let allPracticeStepsByOrderId = await selectPracticeStepsByPracticeId(id);
    let linkedItems = allPracticeStepsByOrderId.map((item) => {
      return Promise.all([
        selectPracticeById(item.practiceId),
        selectFileById(item.fileId),
      ]);
    });

    Promise.all(linkedItems)
      .then((data) => {
        data.forEach((item, index) => {
          allPracticeStepsByOrderId[index].practice = item[0];
          allPracticeStepsByOrderId[index].file = item[1];
        });
      })
      .then(() => {
        res.json(allPracticeStepsByOrderId);
      });
  } catch (error) {
    res.json(error.message);
  }
};

// create an PracticeStep
exports.postPracticeStep = async (req, res) => {
  try {
    const { name, description, practiceId, fileId } = req.body;

    const newPracticeStep = await pool.query(
      'INSERT INTO public."PracticeSteps" (id, "name", "description", "practiceId", "fileId", "createdAt") VALUES (uuid_generate_v4(), $1, $2, $3, $4, current_timestamp) RETURNING *',
      [name, description || null, practiceId, fileId || null]
    );

    res.json(newPracticeStep.rows[0]);
  } catch (error) {
    res.json(error.message);
  }
};

// update an PracticeStep
exports.updatePracticeStep = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, practiceId, fileId } = req.body;
    const updatePracticeStep = await pool.query(
      'UPDATE public."PracticeSteps" SET "name" = $1, "description" = $2, "practiceId" = $3, "fileId" = $4, "updatedAt" = current_timestamp WHERE id = $5',
      [name, description || null, practiceId, fileId || null, id]
    );

    res.json(`PracticeStep ${id} was updated`);
  } catch (error) {
    res.json(error.message);
  }
};

// delete an PracticeStep
exports.deletePracticeStep = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePracticeStep = await pool.query(
      'DELETE FROM public."PracticeSteps" WHERE id = $1',
      [id]
    );

    res.json(`PracticeStep ${id} was successfully deleted`);
  } catch (error) {
    res.json(error.message);
  }
};
