const { Sequelize } = require("sequelize");
const { Pet } = require("../db.js");
const { Op } = require("sequelize");

const petJson = [
  {
    name: "Yomo",
    detail: "Pitbull Terrier, 30kg, 2 years old",
    date: new Date(2020, 8, 4).toISOString(),
  },
  {
    name: "Tuca",
    detail: "Turkish Angora, 5kg",
    date: new Date(2020, 10, 15).toISOString(),
  },
];

const getAllPets = async (name) => {
  if ((await Pet.count()) === 0) {
    await Pet.bulkCreate(petJson);
  }
  if (!name) {
    return await Pet.findAll({});
  } else {
    return await Pet.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
  }
};

const getPetByPK = async (id) => {
  if (id) {
    let pet = await Pet.findOne({
      where: {
        id,
      },
    });
    if (!pet) {
      throw new Error("Pet not found");
    }
    return pet;
  } else {
    throw new Error("Pet not found");
  }
};

const getByPetOwner = async (UserId) => {
  const petOwner = await Pet.findAll({
    where: {
      UserId: {
        [Op.iLike]: `%${UserId}%`,
      },
    },
  });
  if (!petOwner) {
    throw new Error(" Pet not found");
  } else {
    return petOwner;
  }
};
/* const dbCreatePet = async (body) => {
  const { name, detail } = body;
  //console.log(name, detail);
  if (!name || !detail) {
    throw new Error("missing params");
  }
  try {
    const parceDate = new Date(date);
    if (new Date() > parceDate) throw Error("The date has's passed");
    await Pet.create(body);
    return `service ${body.name} created successfully`;
  } catch (error) {
    throw error;
  }
}; */
const dbCreatePet = async (body) => {
  try {
    const { name, detail, date } = body;
    //console.log(name, detail);
    if (!name || !detail || !date) {
      throw new Error("missing query");
    } else {
      await Pet.create(body);
      return `service ${body.name} created successfully`;
    }
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getAllPets,
  getPetByPK,
  getByPetOwner,
  dbCreatePet,
};
