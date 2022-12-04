const { User } = require("../db.js");

const dbCreateUser = async (body) => {
  const { name, lastname, username, password, img, email, address, tel, dni, isAdmin, isActive } = body;
  if (!name && !lastname && !username && !password && !email && !address && !tel && !dni) {
    throw new Error("Missing params");
  } else {
    await User.create(body);
    return `User ${body.name} created successfully`;
  }
};

module.exports = {
  dbCreateUser
};