require("dotenv").config();
const { PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DATABASE } = process.env;
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: PG_DATABASE,
        dialect: "postgres",
        host: PG_HOST,
        port: PG_PORT,
        username: PG_USER,
        password: PG_PASSWORD,
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
        ssl: true,
      })
    : new Sequelize(
        `postgres:${PG_USER}:${PG_PASSWORD}@${PG_HOST}/${PG_DATABASE}`,
        { logging: false, native: false }
      );
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
const {
  User,
  Pet,
  MedicalDiagnostic,
  Score,
  Service,
  Turn,
  Vet,
  Payments,
} = sequelize.models;

// Aca vendrian las relaciones
User.hasMany(Pet);
Pet.belongsTo(User);

User.hasMany(Turn);
Turn.belongsTo(User);

Pet.hasMany(Turn);
Turn.belongsTo(Pet);

Vet.hasMany(Turn);
Turn.belongsTo(Vet);

Payments.hasMany(User);
User.belongsTo(Payments);

Payments.hasMany(Turn);
Turn.belongsTo(Payments);

Pet.hasMany(MedicalDiagnostic);
MedicalDiagnostic.belongsTo(Pet);

Service.belongsToMany(Vet, { through: "Service-Vet" });
Vet.belongsToMany(Service, { through: "Service-Vet" });

Score.belongsToMany(Vet, { through: "Vet-Score" });
Vet.belongsToMany(Score, { through: "Vet-Score" });

Score.belongsToMany(Service, { through: "Service-Score" });
Service.belongsToMany(Score, { through: "Service-Score" });

const Favoritos = sequelize.define("Favoritos", {}, { timestamps: false });
User.belongsToMany(Vet, { through: Favoritos });
Vet.belongsToMany(User, { through: Favoritos });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
