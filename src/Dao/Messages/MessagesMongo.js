import { MongoDBContainer } from "../../Containers/index.js";
import { MessagesModel } from "../../models/index.js";

export class MessagesMongo extends MongoDBContainer {
  constructor() {
    super({
      name: MessagesModel.MessagesCollection,
      schema: MessagesModel.MessagesSchema,
    });
  }
}
