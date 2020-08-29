const pool = require("../db");
const {
  selectPracticeLanguages,
  selectPracticeLanguageById,
} = require("./utilities");

// get all PracticeLanguages
exports.getAllPracticeLanguages = async (req, res) => {
  try {
    res.json(await selectPracticeLanguages());
  } catch (error) {
    res.json(error.message);
  }
};

// get an PracticeLanguage
exports.getOnePracticeLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    res.json(await selectPracticeLanguageById(id));
  } catch (error) {
    res.json(error.message);
  }
};

// create an PracticeLanguage
exports.postPracticeLanguage = async (req, res) => {
  try {
    const { name } = req.body;
    const newPracticeLanguage = await pool.query(
      'INSERT INTO public."PracticeLanguages" (id, name, "createdAt") VALUES (uuid_generate_v4(), $1, current_timestamp) RETURNING *',
      [name]
    );

    res.json(newPracticeLanguage.rows[0]);
  } catch (error) {
    res.json(error.message);
  }
};

// update an PracticeLanguage
exports.updatePracticeLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatePracticeLanguage = await pool.query(
      'UPDATE public."PracticeLanguages" SET name = $1, "updatedAt" = current_timestamp WHERE id = $2',
      [name, id]
    );

    res.json(`PracticeLanguage ${id} was updated`);
  } catch (error) {
    res.json(error.message);
  }
};

// delete an PracticeLanguage
exports.deletePracticeLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletePracticeLanguage = await pool.query(
      'DELETE FROM public."PracticeLanguages" WHERE id = $1',
      [id]
    );

    res.json(`PracticeLanguage ${id} was successfully deleted`);
  } catch (error) {
    res.json(error.message);
  }
};
