const express = require("express");
const app = require("../app");
const router = express.Router();
const { database } = require("../database");

router.post("/login", function (req, res, next) {
   let username = req.body.username;
   let password = req.body.password;
   let sql = `SELECT user_id, username, password FROM user WHERE username = '${username}' AND password = ${password};`;
   database.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
         return res.status(404).send({ message: "Incorrect data", logged: false });
      }
      res.status(200).send({ message: "User logged in successfuly!", logged: true });
   });
});

router.post("/register", function (req, res, next) {
   const { username, password, full_name, email, phone, job } = req.body;
   if (!username || !password || !email || !phone || !job) {
      return res.status(400).send({ message: "Invalid data!" });
   }
   let sql = `INSERT INTO user (username,password) VALUES ('${username}',${password});`;
   database.query(sql, (err, result) => {
      if (err && err.code === "ER_DUP_ENTRY") {
         console.table(err);
         return res.status(400).send({ message: "username already exists" });
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

router.put("/:user_id/update", (req, res) => {
   let user_id = req.params.user_id;
   let body = req.body;
   let infoChanges = "";
   let userChanges = "";
   for (let key in body) {
      if (key !== "password" && key !== "username") {
         infoChanges += `${key} = '${body[key]}',`;
      } else {
         if (key === "password") {
            userChanges += `${key} = ${body[key]},`;
         } else {
            userChanges += `${key} = '${body[key]}',`;
         }
      }
   }
   let tablesToUpdate = ["user", "info"];
   let changesInTable = [userChanges, infoChanges];
   for (const table of tablesToUpdate) {
      changesInTable[tablesToUpdate.indexOf(table)] = changesInTable[tablesToUpdate.indexOf(table)].substring(
         0,
         changesInTable[tablesToUpdate.indexOf(table)].length - 1,
      );
      let sql = `UPDATE ${table} SET ${changesInTable[tablesToUpdate.indexOf(table)]} WHERE user_id = ${user_id};`;
      database.query(sql, (err, result) => {
         if (err) throw err;
         res.status(200).send("user updated!");
      });
   }
});
module.exports = router;
