var express = require("express");
var router = express.Router();
const { database } = require("../database");

/* GET users listing. */
router.get("/", function (req, res, next) {
   res.send("respond with a resource");
});

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
   var sql = `SELECT username FROM user WHERE username = '${username}'`
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
            var userID = result.insertId;
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


module.exports = router;
