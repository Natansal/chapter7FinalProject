const express = require("express");
const { database, createQueryFromRequest } = require("../database");
const router = express.Router();

/* GET users listing. */
function getcomments(req, res, next) {
   database.query(
      `SELECT c.user_id AS 'user_id', i.full_name AS 'full_name', c.post_id AS 'post_id', c.comment_id AS 'comment_id', c.post_id AS post_id, c.body AS 'body' FROM comment c JOIN info i ON c.user_id = i.user_id   ${createQueryFromRequest(
         { ...req.query, ...req.params },
         "c.",
      )};`,
      (err, result) => {
         if (err) {
            return res.status(400).send(err);
         }
         if (req.params.comment_id) {
            result = result[0];
         }
         res.status(200).send(result);
      },
   );
}

router.get("/:user_id/comments", getcomments);
router.get("/:user_id/comments/:comment_id", getcomments);
router.get("/comments", getcomments);

router.post("/:user_id/comments", (req, res, next) => {
   const { user_id } = req.params;
   const { post_id, body } = req.body;
   let query = `INSERT INTO comment (user_id, post_id, body) VALUES (${user_id}, ${post_id}, '${body}' );`;
   database.query(query, (err, result) => {
      if (err) {
         return res.status(400).send(err);
      }
      res.status(200).send({ message: "comment added successfuly!", id: result.insertId });
   });
});

router.put("/:user_id/comments/:comment_id", (req, res, next) => {
   const { deleted } = req.body;
   const { comment_id, user_id } = req.params;
   if (deleted === undefined) {
      return res.status(400).send({ message: "Invalid data!" });
   }
   let toChange = `deleted=${deleted ? 1 : 0}`;
   const query = `
   UPDATE comment
   SET ${toChange}
   WHERE comment_id=${comment_id}
   AND user_id=${user_id};
   `;
   database.query(query, (err, result) => {
      if (err) {
         return res.status(400).send(err);
      }
      res.status(200).send({ message: "Updated successfuly" });
   });
});

router.delete("/:user_id/comments/:comment_id", (req, res, next) => {
   const { comment_id, user_id } = req.params;
   const query = `
   UPDATE comment
   SET deleted=1
   WHERE comment_id=${comment_id}
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
