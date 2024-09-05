const pool = require("./pool");

exports.insertMember = async (first_name, last_name, email, hashedPassword) => {
  try {
    await pool.query(
      "INSERT INTO members (first_name, last_name, email, password, membership_status, admin) VALUES ($1, $2, $3, $4, false, false);",
      [first_name, last_name, email, hashedPassword]
    );
  } catch (err) {
    throw new Error(err);
  }
};
