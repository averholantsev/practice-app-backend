const pool = require("../db");
const {
  selectPracticeCategories,
  selectPracticeCategoryById,
} = require("./utilities");

// get all PracticeCategories
exports.getAllPracticeCategories = async (req, res) => {
  try {
    let allPracticeCategories = await selectPracticeCategories();
    let childPracticeCategory = allPracticeCategories.map((item) => {
      if (item.parentId) return selectPracticeCategoryById(item.parentId);
    });
    Promise.all(childPracticeCategory)
      .then((data) => {
        data.forEach((item, index) => {
          console.log(item);
          if (item) {
            allPracticeCategories[index].parent = item;
            return;
          }
          allPracticeCategories[index].parent = null;
        });
      })
      .then(() => {
        res.json(allPracticeCategories);
      });
  } catch (error) {
    res.json(error.message);
  }
};

// get an PracticeCategory
exports.getOnePracticeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    let onePracticeCategory = await selectPracticeCategoryById(id);
    const parentPracticeCategoryId = onePracticeCategory.parentId;
    if (parentPracticeCategoryId) {
      onePracticeCategory.parent = await selectPracticeCategoryById(
        parentPracticeCategoryId
      );
    }
    res.json(onePracticeCategory);
  } catch (error) {
    res.json(error.message);
  }
};

// create an PracticeCategory
exports.postPracticeCategory = async (req, res) => {
  try {
    const { name, parentId } = req.body;

    const newPracticeCategory = await pool.query(
      'INSERT INTO public."PracticeCategories" (id, name, "parentId", "createdAt") VALUES (uuid_generate_v4(), $1, $2, current_timestamp) RETURNING *',
      [name, parentId || null]
    );

    res.json(newPracticeCategory.rows[0]);
  } catch (error) {
    res.json(error.message);
  }
};

// update an PracticeCategory
exports.updatePracticeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parentId } = req.body;
    const updatePracticeCategory = await pool.query(
      'UPDATE public."PracticeCategories" SET name = $1, "parentId" = $2, "updatedAt" = current_timestamp WHERE id = $3',
      [name, parentId || null, id]
    );

    res.json(`PracticeCategory ${id} was updated`);
  } catch (error) {
    res.json(error.message);
  }
};

// delete an PracticeCategory
exports.deletePracticeCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePracticeCategory = await pool.query(
      'DELETE FROM public."PracticeCategories" WHERE id = $1',
      [id]
    );

    res.json(`PracticeCategory ${id} was successfully deleted`);
  } catch (error) {
    res.json(error.message);
  }
};
