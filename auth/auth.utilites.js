const bcrypt = require("bcrypt");
const pool = require("../db");

// Insert User
exports.insertUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  let result = await pool.query(
    'INSERT INTO public."Users" (id, "email", "password", "createdAt") VALUES (uuid_generate_v4(), $1, $2, current_timestamp) RETURNING *',
    [email, hashedPassword]
  );
  return result.rows[0];
};

// Select User by email
exports.selectUserByEmail = async (email) => {
  let user = await pool
    .query(`SELECT * FROM public."Users" WHERE "email" = '${email}'`)
    .then((user) => {
      return user.rows[0];
    })
    .catch((err) => {
      return { err: err };
    });
  return user;
};

// Check validity of user
exports.isValidUser = async (user, password) => {
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};