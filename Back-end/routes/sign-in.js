var express = require("express");
var fs = require("fs")
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  // {"username": "admin1", "password": "pass"}
  
  let rawdata = fs.readFileSync("./database/user.json");
  let user_array = JSON.parse(rawdata);
  var is_success = false
  let user = req.body.username;
  // console.log(JSON.parse(req.username));
  
  let pass = req.body.password;
  // console.log(JSON.parse(req.password));
  
  for (i = 0; i < user_array.length; i++) {
    if (user_array[i]["username"] == user && user_array[i]["password"] == pass) {
      console.log(true);
      is_success = true
    }
  }
  res.send(JSON.stringify({"function": "sign-in","is_success": is_success, "res": null}));
});

module.exports = router;
