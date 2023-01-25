const express = require("express");
const app = require("../app");
const router = express.Router();
const { database, createQueryFromRequest } = require("../database");

router.get("/:user_id/info", (req, res, next) => {
   database.query(`SELECT * FROM info ${createQueryFromRequest({ ...req.query, ...req.params })};`, (err, result) => {
      if (err) {
         return res.status(400).send(err);
      }
      res.status(200).send(result);
   });
});

router.put("/:user_id/info", (req, res) => {
   const user_id = req.params.user_id;
   const { full_name, email, phone, job } = req.body;
   if (!full_name && !email && !phone && !job) {
      return res.status(400).send({ message: "Invaluid data!" });
   }
   let query = `UPDATE info SET ${full_name ? `full_name='${full_name}',` : ""}${email ? `email='${email}',` : ""}${
      phone ? `phone='${phone}',` : ""
   }${job ? `job='${job}',` : ""}`;
   query = query.substring(0, query.length - 1);
   query += ` WHERE user_id=${user_id}`;
   database.query(query, (err, result) => {
      if (err) {
         return res.status(400).send(err);
      }
      res.status(200).send({ message: "Updated successfuly" });
   });
});

module.exports = router;
