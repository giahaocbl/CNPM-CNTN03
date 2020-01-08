var express = require("express");
var fs = require("fs");
var router = express.Router();
function generate_id() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
}
/* GET users listing. */
router.get("/", function(req, res, next) {
 //{"user_id": "id1", "circle_name":"name"}
  __filename = "./database/circles.json";
  let rawdata = fs.readFileSync(__filename);
  let circle_array = JSON.parse(rawdata);
  var is_success = false;
  let user = req.body.user_id;

  let id = generate_id();
  let new_user_array = [user]
  let new_user = {Circle_id: id, name: req.body.circle_name, user_list: new_user_array};
  circle_array.push(new_user);
  
  fs.writeFile(__filename, JSON.stringify(circle_array), "utf8", function readFileCallback(
    err,
    data
  ) {
    if (err) {
      console.log(err);
      res.send(JSON.stringify({function: "Create-Circle",is_success: is_success, "res": null}));
    }
    else{
      is_success = true;
      res.send(JSON.stringify({function: "Create-Circle","is_success": is_success, "res": id}));
    }
  });
});

module.exports = router;
