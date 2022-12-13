const { Sequelize } = require("sequelize");
const { Pet, MedicalDiagnostic } = require("../db.js");
const { Op } = require("sequelize");
const imgUpload = require("./imgUpload")

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
    include: {
      model: MedicalDiagnostic,
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
      UserId: UserId
    },
  });
  if (!petOwner) {
    throw new Error(" Pet not found");
  } else {
    return petOwner;
  }
};
const dbRemovePet = async (params) => {
    const {id} = params;
  const removePet = await Pet.destroy({
    where: {
      id: id
    },
  });
  if (!removePet) {
    throw new Error(" Pet not found");
  } else {
    return removePet;
  }
};

const dbCreatePet = async (body) => {
  
  try {
    const { name, detail, UserId, img } = body;
      body.date = new Date();
    if (!name || !detail  || !UserId) {
      throw new Error("missing query");
    } else {
      

      if (img) {
        
        const uploadRes = await imgUpload(img)
        if (uploadRes) {
          body.img = uploadRes;
        }
      }

      await Pet.create(body);
      return `Pet ${body.name} created successfully`;
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
  dbRemovePet
};
