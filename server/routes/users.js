var express = require("express");
const app = require("../app");
var router = express.Router();
const { database } = require("../database");


router.post("/login", function (req, res, next) {
   let username = req.body.username;
   let password = req.body.password;
   var sql = `SELECT user_id, username, password FROM user WHERE username = '${username}' AND password = ${password};`;
   database.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result[0].user_id);
      res.status(200).send(JSON.stringify(result[0].user_id));
   });
});


router.post("/register", function (req, res, next) {
   let username = req.body.username;
   let password = req.body.password;
   let full_name = req.body.full_name;
   let email = req.body.email;
   let phone = req.body.phone;
   let job = req.body.job;
   let sql = `SELECT username FROM user WHERE username = '${username}'`
   database.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length === 1) {
         console.log("user already exist");
         res.status(200).send("user user already exist");
      } else {
         sql = `INSERT INTO user (username,password) VALUES ('${username}',${password});`;
         database.query(sql, (err, result) => {
            if (err) throw err;
            console.log("user created successful!");
            let userID = result.insertId;
            sql = `INSERT INTO info (user_id,full_name,email,phone,job) VALUES (${userID},'${full_name}','${email}','${phone}','${job}');`;
            database.query(sql, (err, result) => {
               if (err) throw err;
               console.log("info created successful!");
            });
         });
         res.status(200).send("user created successful!");
      }
   });
});


router.put('/:user_id/update', (req, res) => {
   let user_id = req.params.user_id;
   let body = req.body;
   let infoChanges = '';
   let userChanges = '';
   for (let key in body) {
      if (key !== 'password' && key !== 'username') {
         infoChanges += `${key} = '${body[key]}',`;
      } else {
         if (key === 'password') {
            userChanges += `${key} = ${body[key]},`

         } else {
            userChanges += `${key} = '${body[key]}',`
         }
      }
   }
   let tablesToUpdate = ['user', 'info'];
   let changesInTable = [userChanges, infoChanges];
   for (const table of tablesToUpdate) {
      changesInTable[tablesToUpdate.indexOf(table)] = changesInTable[tablesToUpdate.indexOf(table)].substring(0, changesInTable[tablesToUpdate.indexOf(table)].length - 1);
      let sql = `UPDATE ${table} SET ${changesInTable[tablesToUpdate.indexOf(table)]} WHERE user_id = ${user_id};`
      database.query(sql, (err, result) => {
         if (err) throw err;
         res.status(200).send("user updated!");
      });
   }
})
module.exports = router;
