const express = require("express");
const { database, createQueryFromRequest } = require("../database");
const router = express.Router();

/* GET users listing. */
function getTodos(req, res, next) {
   database.query(`SELECT * FROM todo ${createQueryFromRequest({ ...req.query, ...req.params })};`, (err, result) => {
      if (err) {
         return res.status(400).send(err);
      }
      if (req.params.todo_id) {
         result = result[0];
      }
      res.status(200).send(result);
   });
}

router.get("/:user_id/todos", getTodos);
router.get("/:user_id/todos/:todo_id", getTodos);

router.post("/:user_id/todos", (req, res, next) => {
   const { user_id } = req.params;
   const { title, completed = false } = req.body;
   let query = `INSERT INTO todo (user_id, title, completed) VALUES (${user_id}, '${title}', ${completed ? 1 : 0} );`;
   database.query(query, (err, result) => {
      if (err) {
         return res.status(400).send(err);
      }
      res.status(200).send({ message: "Todo added successfuly!", id: result.insertId });
   });
});

router.put("/:user_id/todos/:todo_id", (req, res, next) => {
   const { completed, deleted } = req.body;
   const { todo_id, user_id } = req.params;
   if (completed === undefined && deleted === undefined) {
      return res.status(400).send({ message: "Invalid data!" });
   }
   let toChange = completed !== undefined ? `completed=${completed ? 1 : 0}` : `deleted=${deleted ? 1 : 0}`;
   const query = `
   UPDATE todo
   SET ${toChange}
   WHERE todo_id=${todo_id}
   AND user_id=${user_id};
   `;
   database.query(query, (err, result) => {
      if (err) {
         return res.status(400).send(err);
      }
      res.status(200).send({ message: "Updated successfuly" });
   });
});

router.delete("/:user_id/todos/:todo_id", (req, res, next) => {
   const { todo_id, user_id } = req.params;
   const query = `
   UPDATE todo
   SET deleted=1
   WHERE todo_id=${todo_id}
   AND user_id=${user_id};
   `;
   database.query(query, (err, result) => {
      if (err) {
         return res.status(400).send(err);
      }
      res.status(200).send({ message: "Deleted successfuly" });
   });
});
module.exports = router;
