const express = require("express");
const { database, createQueryFromRequest } = require("../database");
const router = express.Router();

/* GET users listing. */
function getPosts(req, res, next) {
   database.query(`SELECT * FROM post ${createQueryFromRequest({ ...req.query, ...req.params })};`, (err, result) => {
      if (err) {
         return res.status(400).send(err);
      }
      if (req.params.post_id) {
         result = result[0];
      }
      res.status(200).send(result);
   });
}

router.get("/:user_id/posts", getPosts);
router.get("/:user_id/posts/:post_id", getPosts);

router.post("/:user_id/posts", (req, res, next) => {
   const { user_id } = req.params;
   const { title, body } = req.body;
   let query = `INSERT INTO post (user_id, title, body) VALUES (${user_id}, '${title}', '${body}' );`;
   database.query(query, (err, result) => {
      if (err) {
         return res.status(400).send(err);
      }
      res.status(200).send({ message: "Post added successfuly!", id: result.insertId });
   });
});

router.put("/:user_id/posts/:post_id", (req, res, next) => {
   const { deleted } = req.body;
   const { post_id, user_id } = req.params;
   if (deleted === undefined) {
      return res.status(400).send({ message: "Invalid data!" });
   }
   let toChange = `deleted=${deleted ? 1 : 0}`;
   const query = `
   UPDATE post
   SET ${toChange}
   WHERE post_id=${post_id}
   AND user_id=${user_id};
   `;
   database.query(query, (err, result) => {
      if (err) {
         return res.status(400).send(err);
      }
      res.status(200).send({ message: "Updated successfuly" });
   });
});

router.delete("/:user_id/posts/:post_id", (req, res, next) => {
   const { post_id, user_id } = req.params;
   const query = `
   UPDATE post
   SET deleted=1
   WHERE post_id=${post_id}
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
