const { nanoid } = require("nanoid");

const shortId = {
  type: String,
  default: () => nanoid(), // nanoid 패키지로 shortId 생성한 후 기본 값으로 할당
  required: true,
  index: true,
};

module.exports = shortId;
