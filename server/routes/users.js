const express = require("express");
const app = require("../app");
const router = express.Router();
const { database } = require("../database");

router.post("/login", function (req, res, next) {
   // let username = req.body.username;
   // let password = req.body.password;
   const {username,password} = req.body;
   let sql = `SELECT user_id, username, password FROM user WHERE username = '${username}' AND password = ${password};`;
   database.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
         return res.status(404).send({ message: "Incorrect data", logged: false });
      }
      res.status(200).send({ message: "User logged in successfuly!", logged: true, id: result[0].user_id });
   });
});

router.post("/register", function (req, res, next) {
   const { username, password, full_name, email, phone, job } = req.body;
   if (!username || !password || !email || !phone || !job) {
      return res.status(422).send({ message: "Invalid data!" });
   }
   let sql = `INSERT INTO user (username,password) VALUES ('${username}',${password});`;
   database.query(sql, (err, result) => {
      if (err && err.code === "ER_DUP_ENTRY") {
         return res.status(409).send({ message: "username already exists" });
      }
      if (err) {
         return res.status(400).send(err);
      }
      let userID = result.insertId;
      sql = `INSERT INTO info (user_id,full_name,email,phone,job) VALUES (${userID},'${full_name}','${email}','${phone}','${job}');`;
      database.query(sql, (err, result) => {
         if (err) {
            return res.status(400).send(err);
         }
         res.status(200).send({ message: "user created successful!", id: userID });
      });
   });
});

router.put("/:user_id", (req, res) => {
   let user_id = req.params.user_id;
   const { username, newUsername, password, newPassword } = req.body;
   if (!newUsername && !newPassword) {
      return res.status(400).send({ message: "Invalid data!" });
   }
   let sql = `SELECT user_id, username, password FROM user WHERE username = '${username}' AND password = ${password};`;
   database.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length === 0 || result[0].user_id != user_id) {
         return res.status(404).send({ message: "Incorrect data" });
      }
      let toUpdate = "SET";
      if (newUsername) {
         toUpdate += ` username='${newUsername}',`;
      }
      if (newPassword) {
         toUpdate += ` password=${newPassword}`;
      } else {
         toUpdate = toUpdate.substring(0, toUpdate.length - 1);
      }
      sql = `UPDATE user ${toUpdate} WHERE user_id = ${user_id};`;
      database.query(sql, (err, result) => {
         if (err && err.code === "ER_DUP_ENTRY") {
            return res.status(400).send({ message: "username already exists" });
         }
         if (err) {
            return res.status(400).send(err);
         }
         res.status(200).send({ message: "user updated!" });
      });
   });
});
module.exports = router;
