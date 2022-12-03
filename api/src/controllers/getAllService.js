const { Service } = require("../db");
const { Op } = require("sequelize");

const JSONService = [
  {
    type: "Healthcare Clinic",
    name: "Preventive Medicine",
    price: 130,
    timelapse: 60,
    detail: `As prevention is better than cure, we will give you the best tips for caring for your pet. Come and find out about vaccination plans and how to deworm your animals.

    Receive information about how to educate puppies or what to feed them. We make prevention plans for animals that are going to travel abroad,
    geriatric or suffering from certain pathologies.

    We carry out regular health checks, analysis for leishmania (mosquito disease), filaria (heartworm), weight controls and much more. Come over and ask.`
  },
  {
    type: "Healthcare Clinic",
    name: "New Companion Animals",
    price: 80,
    timelapse: 80,
    detail: `Those commonly known as exotic animals are not so much anymore. Rabbits, guinea pigs, chinchillas, parrots, canaries, iguanas, turtles, among others, are becoming part of more and more families.

    The anatomy and physiological needs of these species differ greatly from those of traditional pets,
    and for this reason they also need special handling and feeding conditions. At our center, we implement protocols for all of these species.`
  },
  {
    type: "Healthcare Clinic",
    name: "Obstetrics and Reproduction",
    price: 150,
    timelapse: 80,
    detail: `Diseases of the reproductive system are common in both males and females. Benign prostatic hyperplasia, cryptorchidism, and phimosis are clear examples in the male. Similarly, mammary tumors, pyometra and silent heat are so in females.The obstetrics and reproduction service makes prevention and treatment measures, both medical and surgical, available to the client for these diseases.

    On the other hand, we assist reproduction, through cytological and serological determination of the ideal moment for mating, as well as artificial insemination.`
  },
  {
    type: "Healthcare Clinic",
    name: "Internal Medicine",
    price: 200,
    timelapse: 60,
    detail: `It is the basis of medicine, from which we can address complex pathologies by refining the diagnosis. It includes, among others, the study and treatment of digestive, urinary, cardiorespiratory, endocrine, and infectious diseases.

    A good differential diagnosis and the choice of the necessary tests,
    simplifies the process and limits spending, allowing the speedy recovery of our animals.`
  },
  {
    type: "Healthcare Clinic",
    name: "Dermatology",
    price: 110,
    timelapse: 70,
    detail: `Skin problems represent an important part of the animal ailments that we receive at our clinic and their resolution is not always easy. Atopic dermatitis, allergy to flea bites or food hypersensitivity represent a diagnostic challenge that we face on a daily basis.

    At Youpet we understand that a good diagnosis is essential and for this we carry out cytologies, trichograms, allergy tests and any other type of test to detect the problem.`
  },
  {
    type: "Healthcare Clinic",
    name: "Feline Medicine",
    price: 50,
    timelapse: 60,
    detail: `At Youpet we have a quality plus thanks to the accreditation that we are carrying out as "Cat Friendly Clinic", a certificate granted by the International Society of International Feline Medicine (ISFM).

    Limiting stress in cats seems essential to us, which is why we have a waiting room,
    consultation and hospitalization rooms for the exclusive use of cats. We also have the figure of the "Cat Defender" for any questions that may arise`
  },
  {
    type: "Healthcare Clinic",
    name: "Oftalmology",
    price: 250,
    timelapse: 60,
    detail: `Ophthalmology is becoming increasingly relevant since good animal vision provides a better quality of life. Keratoconjunctivitis sicca, indolent corneal ulcers or abnormalities in the eyelids are common pathologies in certain breeds.

    Our staff have the necessary training to address and solve these problems.`
  },
  {
    type: "Surgery and Anesthesia",
    name: "Soft Tissue Surgery",
    price: 120,
    timelapse: 60,
    detail: `We do elective sterilization surgeries within reproductive health prevention plans, gastrointestinal, liver and biliary system, bladder, ureters and kidney, adrenal, spleen and pancreas surgery.

    We repair abdominal, inguinal and perineal hernias. We do dental prophylaxis, extraction of dental pieces,
    skin plasties and closure of traumatic wounds.`
  },
  {
    type: "Surgery and Anesthesia",
    name: "Laser Surgery",
    price: 250,
    timelapse: 60,
    detail: `The CO2 laser is one of the most unique surgical tools in Veterinary Medicine. Its application in soft tissue surgery offers significant advantages in terms of shortening the surgical procedure, healing and patient recovery. It has its most recognized application in the surgery of Brachycephalic Syndrome.`
  },
  {
    type: "Diagnostics",
    name: "Laboratory Analysis",
    price: 250,
    timelapse: 60,
    detail: `Our Center has equipment to carry out on-site analysis. In this way, procedures are accelerated and we can issue a diagnosis and implement the appropriate treatment quickly and effectively.

    Discover all the analyzes we carry out in our clinic.`
  },
  {
    type: "Diagnostics",
    name: "Digital Radiology",
    price: 250,
    timelapse: 60,
    detail: `Radiology offers information on the state of both soft tissues and bones and joints, making it an invaluable tool.

    The digital technique makes it possible to obtain a much clearer image than the classical one on film, which further optimizes this resource.
    
    Digital radiology, on the other hand,
    facilitates the dissemination and use of the images obtained, since they are stored as image files, easily shared with the client and/or referring veterinarians.`
  },
  {
    type: "Diagnostics",
    name: "Ultrasound",
    price: 40,
    timelapse: 60,
    detail: `Ultrasound is a very useful diagnostic technique, since it offers a lot of information about the state of the internal organs in a non-invasive, immediate and precise way.

    It can be diagnostic by itself or a valuable adjunct to radiology.
    
    In addition, it is a very useful tool in taking samples and punctures, as they are ultrasound-guided.`
  },
  {
    type: "Aesthetics",
    name: "Feline and Canine Daycare",
    price: 40,
    timelapse: 60,
    detail: `Among our facilities we have daycare centers for dogs and cats. To accommodate your pets, it is essential that they are vaccinated up to date and dewormed before their stay. Unless they need a specific or prescription diet, they will be fed with high-end feed at no additional cost.`
  },
  {
    type: "Aesthetics",
    name: "Hairdressing",
    price: 40,
    timelapse: 60,
    detail: `Our canine and feline grooming service offers a wide variety of haircuts and baths, both aesthetic and therapeutic.

    They are cut commercially and with scissors and each animal is bathed with the most appropriate shampoo and conditioner for its type of skin and coat. In addition, they trim their nails, clean their ears, and empty their anal sacs.
    Likewise, shampoo therapy and therapeutic cutting treatments are provided for animals with dermatological problems that require it.`
  },
  {
    type: "Aesthetics",
    name: "Trichina Analysis",
    price: 50,
    timelapse: 70,
    detail: `Trichinosis is a disease caused by the encysted larvae of a worm of the Trichinella genus of which there are several species. In Aragon there are Trichinella spiralis and Trichinella britovi.

    It is produced by eating raw or undercooked meat or meat products from animals infested with Trichina.
    In our center, and protected by the Order of the Government of Aragon of October 20, 2009, we make available to the consumer the analysis of Trichina in meat samples using the digestion technique.`
  }
];

const getDBService = async (name) => {
  if ((await Service.count()) === 0) {
    await Service.bulkCreate(JSONService);
  }
  if (!name) {
    return await Service.findAll({});
  } else {
    return await Service.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
  }
};

const getDBServiceByPK = async (id) => {
  if (id) {
    let service = await Service.findOne({
      where: {
        id,
      },
    });
    if (!service) {
      throw new Error("service not found");
    }
    return service;
  } else {
    throw new Error("missing serviceId");
  }
};

const dbServiceCreate = async (body) => {
  const { type, name, price, timelapse } = body;
  if (!type || !name || !price || !timelapse) {
    throw new Error("missing params");
  }
  try {
    //const parceDate = new Date(inicialDate).toISOString();
    //console.log(parceDate);
    //if (new Date() > parceDate) throw Error("Fecha en el pasado");
    await Service.create(body);
    return `service ${body.name} created successfully`;
  } catch (error) {
    throw error;
  }
};
const dbDeleteService = async (id) => {
  await Service.destroy({
    where: { id },
  });
  return `service id:${id} deleted sucessfully`;
};

module.exports = {
  getDBService,
  getDBServiceByPK,
  dbServiceCreate,
  dbDeleteService,
};