import { Schema } from "mongoose";

const ProductsCollection = "products";

const ProductSchema = new Schema(
  {
    producto: { type: String, required: true, max: 100 },
    precio: { type: Number, required: true },
    urlImagen: { type: String, required: true, max: 100 },
  },
  {
    virtuals: true,
  }
);

ProductSchema.set("toJSON", {
  transform: (_, response) => {
    response.id = response._id;
    delete response.__v;
    delete response._id;
    return response;
  },
});

export const ProductModel = { ProductsCollection, ProductSchema };
