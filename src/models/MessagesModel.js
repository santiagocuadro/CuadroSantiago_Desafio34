import { Schema } from "mongoose";

const MessagesCollection = "messages";

const MessagesSchema = new Schema(
  {
		author: {
			id: { type: String, required: true, max: 100},
			nombre: { type: String, required: true, max: 100 },
			apellido: { type: String, required: true, max: 100},
			edad: { type: Number, required: true },
			alias: { type: String, required: true, max: 100 },
    	avatar: { type: String, required: true, max: 100 },
		},
		text: { type: String, required: true, max: 150 }
  },
  {
    virtuals: true,
  }
);

MessagesSchema.set("toJSON", {
  transform: (_, response) => {
    delete response.__v;
    return response;
  },
});

export const MessagesModel = { MessagesCollection, MessagesSchema };
