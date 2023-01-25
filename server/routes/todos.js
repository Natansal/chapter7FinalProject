const express = require("express");
const { database, createQueryFromRequest } = require("../database");
const router = express.Router();

/* GET users listing. */
router.get("/:user_id/todos", function (req, res, next) {
   console.log(req.params);
   //req.params is an empty object
   database.query(`SELECT * FROM todo ${createQueryFromRequest({ ...req.query, ...req.params })};`, (err, result) => {
      if (err) {
         return res.status(400).send(err);
      }
      res.status(200).send(result);
   });
});

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
   const { completed } = req.body;
   const todo_id = req.params.todo_id;
   const query = `
   UPDATE todo
   SET completed=${completed}
   WHERE todo_id=${todo_id}
   `;
   database.query(query, (err, result) => {
      if (err) {
         return res.status(400).send(err);
      }
      res.status(200).send({ message: "Updated successfuly" });
   });
});
module.exports = router;
