require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: {
          rejectUnauthorized: false,
        },
      })
    : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/youpet`, {
        logging: false,
        native: false,
      });

/* const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/youpet`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
); */
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Pet, Admin, MedicalDiagnostic, Score, Service, Turn, Vet } =
  sequelize.models;

// Aca vendrian las relaciones
User.hasMany(Pet);
Pet.belongsTo(User);

User.hasMany(Turn);
Turn.belongsTo(User);

Pet.hasMany(Turn);
Turn.belongsTo(Pet);

Vet.hasMany(Turn);
Turn.belongsTo(Vet);

Pet.hasMany(MedicalDiagnostic);
MedicalDiagnostic.belongsTo(Pet);

Admin.belongsToMany(Service, { through: "Admin_Service" });
Service.belongsToMany(Admin, { through: "Admin_Service" });

Admin.belongsToMany(Turn, { through: "Admin_Turn" });
Turn.belongsToMany(Admin, { through: "Admin_Turn" });

Admin.belongsToMany(Vet, { through: "Admin-Vet" });
Vet.belongsToMany(Admin, { through: "Admin-Vet" });

Service.belongsToMany(Vet, { through: "Service-Vet" });
Vet.belongsToMany(Service, { through: "Service-Vet" });

Score.belongsToMany(Vet, { through: "Vet-Score" });
Vet.belongsToMany(Score, { through: "Vet-Score" });

Score.belongsToMany(Service, { through: "Service-Score" });
Service.belongsToMany(Score, { through: "Service-Score" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
