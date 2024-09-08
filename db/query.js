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

exports.searchUsername = async (username) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM members WHERE email = $1",
      [username]
    );
    return rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

exports.selectUserById = async (id) => {
  try {
    const { rows } = await pool.query("SELECT * FROM members WHERE id = $1", [
      id,
    ]);
    return rows[0];
  } catch (err) {
    throw new Error(err);
  }
};

exports.updateMembershipStatus = async (userId) => {
  try {
    const { rows } = await pool.query("SELECT * FROM members WHERE id = $1", [
      userId,
    ]);
    const updatedMemberShip = !rows[0].membership_status;
    await pool.query(
      "UPDATE members SET membership_status = $1 WHERE id = $2",
      [updatedMemberShip, userId]
    );
  } catch (err) {
    throw new Error(err);
  }
};
