var express = require("express");
var fs = require("fs");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  // sample data req.body
  // {"username": "admin1", "password": "pass"}
  __filename = "./database/user.json";
  let rawdata = fs.readFileSync(__filename);
  let user_array = JSON.parse(rawdata);
  var is_success = false;
  let user = req.body.username;

  let pass = req.body.password;
  for (i = 0; i < user_array.length; i++) {
    if (user_array[i]["username"] == user) {
      is_success = false;
      res.send(
        JSON.stringify({
          function: "register",
          is_success: is_success,
          res: "username existed"
        })
      );
      return false;
    }
  }
  let id = user_array.length + 1;

  let new_user = { username: user, password: pass, user_id: "id" + id };
  user_array.push(new_user);
  console.log(user_array);
  
  fs.writeFile(__filename, JSON.stringify(user_array), "utf8", function readFileCallback(
    err,
    data
  ) {
    if (err) {
      console.log(err);
      res.send(
        JSON.stringify({
          function: "register",
          is_success: is_success,
          res: "fail"
        })
      );
    }
    else{
      is_success = true
      res.send(
        JSON.stringify({
          function: "register",
          is_success: is_success,
          res: null
        })
      );
    }
  });
});

module.exports = router;
