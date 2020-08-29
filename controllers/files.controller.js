const pool = require("../db");
const fs = require("fs");
const { selectFiles, selectFileById } = require("./utilities");
const FILES_PUTH = "D:\\Web\\practice-app-backend\\src\\uploads\\";

/* // get all Files
exports.getAllFiles = async (req, res) => {
  try {
    res.json(await selectFiles());
  } catch (error) {
    res.json(error.message);
  }
}; */

// get an File
exports.getOneFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await selectFileById(id);
    res.sendFile(FILES_PUTH + file.name, (err) => {
      if (err) console.log(err);
    });
  } catch (error) {
    res.json(error.message);
  }
};

// create a File
exports.postFile = async (req, res) => {
  try {
    const { originalname, mimetype, filename, path } = req.file;
    const extansion = /(?:\.([^.]+))?$/.exec(originalname)[1];
    const insertFile = await pool
      .query(
        'INSERT INTO public."Files" (id, "name", "mimeType", "extension", "path", "createdAt") VALUES (uuid_generate_v4(), $1, $2, $3, $4, current_timestamp) RETURNING *',
        [filename, mimetype, extansion || null, path]
      )
      .then((data) => {
        res.json(data.rows[0]);
      });
  } catch (error) {
    res.json(error.message);
  }
};

// update an File
exports.updateFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { originalname, mimetype, filename, path } = req.file;
    const extansion = /(?:\.([^.]+))?$/.exec(originalname)[1];
    const updateFile = await pool
      .query(
        'UPDATE public."Files" SET "name" = $1, "mimeType" = $2, "extension" = $3, "path" = $4, "updatedAt" = current_timestamp WHERE id = $5',
        [filename, mimetype, extansion || null, path, id]
      )
      .then(() => {
        fs.unlink(FILES_PUTH + name, (err) => {
          if (err) {
            console.log(err);
          }
        });
      })
      .then(() => {
        res.json("File was successfully updated!");
      });
  } catch (error) {
    res.json(error.message);
  }
};

// delete an File
exports.deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const deleteFile = await pool
      .query('DELETE FROM public."Files" WHERE id = $1', [id])
      .then(() => {
        fs.unlink(FILES_PUTH + name, (err) => {
          if (err) {
            console.log(err);
          }
        });
      })
      .then(() => {
        res.json(`File ${id} was successfully deleted`);
      });
  } catch (error) {
    res.json(error.message);
  }
};
