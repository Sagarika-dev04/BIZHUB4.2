import mongoose, { Schema, models, model } from "mongoose";

const businessCardSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    address: { type: String },
    image: { type: String },
    email: { type: String },
    website: { type: String },
    phone: { type: String },
    openingHours: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" }, // for ownership
  },
  { timestamps: true,
    collection:"Business_Info_Cards",
   }
);

export const BusinessCard =
  models.BusinessCard || model("BusinessCard", businessCardSchema);
