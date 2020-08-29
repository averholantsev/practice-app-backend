const pool = require("../db");
const {
  selectPractices,
  selectPracticeById,
  selectCustomerById,
  selectPracticeCategoryById,
  selectPracticeLanguageById,
} = require("./utilities");

// get all Practices
exports.getAllPractices = async (req, res) => {
  try {
    let allPractices = await selectPractices();
    let linkedItems = allPractices.map((item) => {
      return Promise.all([
        selectCustomerById(item.authorId),
        selectPracticeCategoryById(item.practiceCategoryId),
        selectPracticeLanguageById(item.practiceLanguageId),
      ]);
    });

    Promise.all(linkedItems)
      .then((data) => {
        data.forEach((item, index) => {
          allPractices[index].author = item[0];
          allPractices[index].practiceCategory = item[1];
          allPractices[index].practiceLanguage = item[2];
        });
      })
      .then(() => {
        res.json(allPractices);
      });
  } catch (error) {
    res.json(error.message);
  }
};

// get an Practice
exports.getOnePractice = async (req, res) => {
  try {
    const { id } = req.params;
    let onePractice = await selectPracticeById(id);
    Promise.all([
      selectCustomerById(onePractice.authorId),
      selectPracticeCategoryById(onePractice.practiceCategoryId),
      selectPracticeLanguageById(onePractice.practiceLanguageId),
    ])
      .then((data) => {
        onePractice.author = data[0];
        onePractice.practiceCategory = data[1];
        onePractice.practiceLanguage = data[2];
      })
      .then(() => {
        res.json(onePractice);
      });
  } catch (error) {
    res.json(error.message);
  }
};

// create an Practice
exports.postPractice = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discount,
      practiceAccess,
      authorId,
      practiceCategoryId,
      practiceLanguageId,
    } = req.body;

    const newPractice = await pool.query(
      'INSERT INTO public."Practices" (id, "name", "description", "price", "discount", "practiceAccess", "authorId", "practiceCategoryId", "practiceLanguageId", "createdAt") VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, $6, $7, $8, current_timestamp) RETURNING *',
      [
        name,
        description || null,
        price,
        discount || null,
        practiceAccess,
        authorId,
        practiceCategoryId,
        practiceLanguageId,
      ]
    );

    res.json(newPractice.rows[0]);
  } catch (error) {
    res.json(error.message);
  }
};

// update an Practice
exports.updatePractice = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      discount,
      practiceAccess,
      authorId,
      practiceCategoryId,
      practiceLanguageId,
    } = req.body;
    const updatePractice = await pool.query(
      'UPDATE public."Practices" SET "name" = $1, "description" = $2, "price" = $3, "discount" = $4, "practiceAccess" = $5, "authorId" = $6, "practiceCategoryId" = $7, "practiceLanguageId" = $8, "updatedAt" = current_timestamp WHERE id = $9',
      [
        name,
        description || null,
        price,
        discount || null,
        practiceAccess,
        authorId,
        practiceCategoryId,
        practiceLanguageId,
        id,
      ]
    );

    res.json(`Practice ${id} was updated`);
  } catch (error) {
    res.json(error.message);
  }
};

// delete an Practice
exports.deletePractice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePractice = await pool.query(
      'DELETE FROM public."Practices" WHERE id = $1',
      [id]
    );

    res.json(`Practice ${id} was successfully deleted`);
  } catch (error) {
    res.json(error.message);
  }
};
