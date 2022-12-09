const { Service, User } = require("../db");

const getAllFavorites = async (UserId, ServiceId) => {
  const favoritos = await User.findOne({
    where: { id },
    include: Service,
  });
  if (!favoritos.length) {
    throw new Error("no existen favoritos");
  }
  return favoritos;
};

const dbFavoriteCreate = async (params) => {
  const { userId, serviceId } = params;
  if (!userId || !serviceId) {
    throw new Error("missing params");
  }
  try {
    await create();
    return `Service ${body.name} created successfully`;
  } catch (error) {
    throw error;
  }
};
