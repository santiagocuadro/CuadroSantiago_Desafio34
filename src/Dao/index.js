import { config } from "../config/index.js";
import { MongoDBService } from "../services/index.js";
import { MessagesMongo, MessagesFilesystem, MessagesMemory } from "./Messages/index.js";
import { ProductsMongo, ProductsFilesystem, ProductsMemory } from "./Products/index.js";

const getSelectedDaos = () => {
  switch (config.SERVER.SELECTED_DATABASE) {
    case "mongo": {
      MongoDBService.init();
      return {
        ProductDao: new ProductsMongo(),
        MessagesDao: new MessagesMongo(),
      };
    }
    case "filesystem": {
      return {
        ProductDao: new ProductsFilesystem(),
        MessagesDao: new MessagesFilesystem(),
      };
    }
    case "memory": {
      return {
        ProductDao: new ProductsMemory(),
        MessagesDao: new MessagesMemory(),
      };
    }
  }
};

const { ProductDao, MessagesDao } = getSelectedDaos();

export { ProductDao, MessagesDao };
