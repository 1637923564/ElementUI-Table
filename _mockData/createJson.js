let Mock = require("mockjs");
let fs = require("fs");

let data = Mock.mock({
  "users|15": [
    {
      "id|+1": 1,
      name: "@cname",
      "age|15-29": 22,
      "phone|1000000-3333333": 1241412,
      address: "@county(true)",
      "e-mail": /\d{5}@\w{2}\.com/
    }
  ]
});

let writeWay = fs.createWriteStream(__dirname + "/userList.json", {
  encoding: "utf8"
});
writeWay.write(JSON.stringify(data), "utf8");
