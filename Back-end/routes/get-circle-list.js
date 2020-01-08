var express = require("express");
var fs = require("fs");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
 //{"user_id": "id1"}
  __filename = "./database/circles.json";
  let rawdata = fs.readFileSync(__filename);
  let circle_array = JSON.parse(rawdata);
  var is_success = false;
  circle_list = []
  let user = req.body.user_id;
  for(i = 0; i < circle_array.length; i++){
    if(circle_array[i]['user_list'].includes(user)){
        circle_list.push(circle_array[i])
    }
  }
  res.send(JSON.stringify({function: "get-list-circle", circle_list: circle_list, res: null})) 

});

module.exports = router;
