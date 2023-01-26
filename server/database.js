const mysql = require("mysql");
const fetch = require("node-fetch");

const database = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "z10mz10m",
   database: "JSONplaceholder",
});

database.connect(function (err) {
   if (err) throw err;
   console.log("Connected to database!");
});

function createQueryFromRequest(queryObj, startChar = "") {
   if (!queryObj) {
      return "";
   }
   let query = "WHERE ";
   for (let key in queryObj) {
      if (Number.isNaN(Number(queryObj[key]))) {
         queryObj[key] = `'${queryObj[key]}'`;
      }
      if (query !== "WHERE ") {
         query += "AND ";
      }
      query += `${startChar}${key}=${queryObj[key]} `;
   }
   return query === "WHERE " ? "" : query.substring(0, query.length - 1);
}

async function fillDatabase() {
   //demo to fill the database from jsonplaceholder
   let comments = await fetch("https://jsonplaceholder.typicode.com/comments");
   comments = await comments.json();
   comments.forEach((comment, index) => {
      let commentQuery = [];
      commentQuery.push([parseInt(index / 50) + 1, comment.postId, comment.body.substring(0, 255)]);

      let query = "INSERT INTO comment (user_id, post_id, body) VALUES (?)";
      database.query(query, commentQuery, (err, result) => {
         if (err) throw err;
         console.log(index + " successful!");
      });
   });
}

module.exports = { database, createQueryFromRequest };
