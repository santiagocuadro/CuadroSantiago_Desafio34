import dotenv from 'dotenv';
dotenv.config();

const PRODUCTS_FILENAME = "products";
const MESSAGES_FILENAME = "messages";

const config = {
  SERVER: {
    PORT: process.env.PORT || 8080,
    SELECTED_DATABASE: process.env.SELECTED_DB ?? "memory",
  },
  DATABASES: {
    filesystem: {
      PRODUCTS_FILENAME,
      MESSAGES_FILENAME,
    },
    mongo: {
      url: process.env.MONGO_DB_URL,
      dbName: process.env.MONGO_DB_NAME,
    }
  },
};

export { config };
