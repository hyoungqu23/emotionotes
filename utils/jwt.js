const jwt = require("jsonwebtoken");
const secret = "secretKey"; // "secretKey": 진짜 Secret Key 작성

exports.secret = secret;

exports.setUserToken = (res, user) => {
  const token = jwt.sign(user, secret);

  res.cookie("token", token);
};
