import { faker } from "@faker-js/faker";
faker.locale = "es";

const createFakeUser = (id) => {
  return {
    nombre:faker.commerce.productName(),
    price:faker.random.numeric(3),
    foto:faker.image.imageUrl(),
  }
};
export {
  createFakeUser,
};
