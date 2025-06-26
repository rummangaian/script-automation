const pool = require("./index");

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Databse Time ", res.rows[0]);
  }
  pool.end();
});
