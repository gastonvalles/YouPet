const { Op } = require("sequelize");
const { Vet, User, Favorites } = require("../db");
const { Sequelize } = require("sequelize");

const JsonVet = [
  {
    name: "Federico",
    lastname: "Saffores",
    email: "federicosaffores3@gmail.com",
    address: "calle falsa 124",
    isActive: true,
    speciality: "Healthcare Clinic",
    review: "",
    average: 4,
    img: "https://i0.wp.com/revista.weepec.com/wp-content/uploads/2021/02/vet-and-pet-EESKSLX.jpg?fit=1200%2C800&ssl=1",
    inicialDate: new Date(2022, 1, 10, 9, 0, 0),
    finishDate: new Date(2022, 1, 10, 12, 0, 0),
    tel: 2615594312,
    dni: 39987470,
    fav: 0,
  },
  {
    name: "Gaston",
    lastname: "Valles",
    isActive: true,
    speciality: "Healthcare Clinic",
    review: "",
    average: 0,
    img: "https://www.parqueavellanedaweb.com.ar/2022/mayo/imagenes/hospitalG.jpg",
    inicialDate: new Date(2022, 1, 10, 13, 0, 0),
    finishDate: new Date(2022, 1, 10, 18, 0, 0),
    tel: 2619994713,
    dni: 39987329,
    fav: 0,
    email: "gastonvallesvet@gmail.com",
    address: "ya no se ayuda 345",
  },
  {
    name: "Veronica",
    lastname: "Mosquera",
    isActive: true,
    speciality: "Anesthesia",
    review: "",
    average: 0,
    img: "https://img.freepik.com/foto-gratis/cerca-veterinario-cuidando-gato_23-2149100172.jpg?w=2000",
    inicialDate: new Date(2022, 1, 10, 9, 0, 0),
    finishDate: new Date(2022, 1, 10, 11, 0, 0),
    tel: 2612904314,
    dni: 39987915,
    fav: 0,
    email: "vetronica@gmail.com",
    address: "ya no se ayuda 456",
  },
  {
    name: "Kelvin",
    lastname: "Reyes",
    isActive: true,
    speciality: "Anesthesia",
    review: "",
    average: 0,
    img: "https://raed.academy/wp-content/uploads/2020/06/veterinarios-y-Covid-19-dstNtc.jpg",
    inicialDate: new Date(2022, 1, 10, 14, 0, 0),
    finishDate: new Date(2022, 1, 10, 18, 0, 0),
    tel: 2617774315,
    dni: 39987007,
    fav: 0,
    email: "kelvin@gmail.com",
    address: "ya no se ayuda 567",
  },
  {
    name: "Ernesto",
    lastname: "Velazquez",
    isActive: true,
    speciality: "Diagnostics",
    review: "",
    average: 0,
    img: "https://www.terravet.es/images-tv/medicina-general-440x440.jpg",
    inicialDate: new Date(2022, 1, 10, 15, 0, 0),
    finishDate: new Date(2022, 1, 10, 19, 0, 0),
    tel: 2619004316,
    dni: 39987321,
    fav: 0,
    email: "ernestovvetlazquez@gmail.com",
    address: "ya no se ayuda 678",
  },
  {
    name: "Pedro",
    lastname: "Gonzalez",
    isActive: true,
    speciality: "Diagnostics",
    review: "",
    average: 0,
    img: "https://www.eluniversal.com.co/binrepository/933x700/0c0/0d0/none/13704/EOIR/atencion-de-un-perro_2171107_20190919214128.jpg",
    inicialDate: new Date(2022, 1, 10, 13, 0, 0),
    finishDate: new Date(2022, 1, 10, 15, 0, 0),
    tel: 2612294317,
    dni: 39987265,
    fav: 0,
    email: "pedrobaneado@gmail.com",
    address: "ya no se ayuda 789",
  },
  {
    name: "Luis",
    lastname: "Goytia",
    isActive: true,
    speciality: "Aesthetics",
    review: "",
    average: 0,
    img: "https://static.studyusa.com/blog/cdn_AAogJGqN1IvI7PCZLRfgB9Ioix0JhXiP.jpg?format=webp",
    inicialDate: new Date(2022, 1, 10, 12, 0, 0),
    finishDate: new Date(2022, 1, 10, 19, 0, 0),
    tel: 2619394318,
    dni: 39987237,
    fav: 0,
    email: "luisgoytiavet@gmail.com",
    address: "ya no se ayuda 890",
  },
  {
    name: "Mathias",
    lastname: "Ledesma",
    isActive: false,
    speciality: "Aesthetics",
    review: "",
    average: 0,
    img: "https://www.elnuevodia.com/resizer/52xzoCVxCN6QQzsYWabPJrRD2LQ=/829x0/filters:quality(75):format(jpeg):focal(2812x1375:2822x1365)/cloudfront-us-east-1.images.arcpublishing.com/gfrmedia/SQM3KRQEMBDUBAUVZQ5YG57BO4.jpg",
    inicialDate: new Date(2022, 1, 10, 14, 0, 0),
    finishDate: new Date(2022, 1, 10, 18, 0, 0),
    tel: 2618894319,
    dni: 39987235,
    fav: 0,
    email: "mathiasvetledesma@gmail.com",
    address: "ya no se ayuda 900",
  },
];

const getDBVet = async (name) => {
  if ((await Vet.count()) === 0) {
    await Vet.bulkCreate(JsonVet);
  }
  if (!name) {
    return await Vet.findAll({});
  } else {
    return await Vet.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
  }
};

const getDBVetByPK = async (id, user) => {
  if (id) {
    const vet = await Vet.findOne({
      where: {
        id,
      },
      raw: true,
    });
    const favoritos = await Favorites.count({
      where: {
        VetId: id,
      },
    });
    let userinfo = undefined;
    if (user) {
      userinfo = await Favorites.count({
        where: {
          UserId: user.id,
          VetId: id,
        },
      });
    }
    if (!vet) {
      throw new Error("vet not found");
    }
    console.log(userinfo);
    console.log(vet);
    /*    if (userinfo !== undefined) vet["isFavorite"] = userinfo === 1; */
    return Object.assign({}, vet, {
      isFavorite: userinfo === 1,
      totalfav: favoritos,
    });
  } else {
    throw new Error("missing Id");
  }
};

const dbCreateVet = async (body) => {
  try {
    const {
      name,
      lastname,
      isActive,
      speciality,
      review,
      average,
      inicialDate,
      finishDate,
      tel,
      img,
      fav,
      email,
      address,
      dni,
    } = body;
    if (
      !name &&
      !lastname &&
      !isActive &&
      !speciality &&
      review &&
      average &&
      !inicialDate &&
      !finishDate &&
      !tel &&
      !email &&
      !address &&
      !dni
    ) {
      throw new Error("missing query");
    } else {
      await Vet.create(body);
      return `vet ${body.name} created successfully`;
    }
  } catch (error) {
    throw error;
  }
};

const dbDeleteVet = async (id) => {
  await Vet.destroy({
    where: { id },
  });
  return `Vet id:${id} deleted sucessfully`;
};

module.exports = {
  getDBVet,
  getDBVetByPK,
  dbCreateVet,
  dbDeleteVet,
};
