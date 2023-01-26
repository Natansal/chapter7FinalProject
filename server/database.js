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
   let arr = [],
      counter = 0,
      counter2 = 0;
   for (let i = 0; i < 100; i++) {
      arr[i] = 0;
   }
   while (counter < 500) {
      let num = Math.floor(Math.random() * 100) + 1;
      if (arr[num - 1] <= 5) {
         arr[num - 1]++;
         counter++;
         database.query(`UPDATE comment SET post_id=${num} WHERE comment_id=${counter}`, (err, res) => {
            counter2++;
            if (err) {
               throw err;
            }
            console.log(counter2 + " success!", num);
         });
      }
   }
}

module.exports = { database, createQueryFromRequest };
