var express = require("express");
var fs = require("fs")
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  //sample data in body  
  //{"name": "user 1"}

  let rawdata = fs.readFileSync("./database/user-info.json");
  let user_array = JSON.parse(rawdata);
  var is_success = false
  let name = req.body.name
  let find_array = []
 for(i=0; i < user_array.length; i++){
    if(user_array[i]['name'] == name){
        find_array.push(user_array[i])
    }
 }
 console.log(find_array);
 
 res.send(JSON.stringify({function: "find-user","find-array": find_array, res: null}));
});

module.exports = router;
