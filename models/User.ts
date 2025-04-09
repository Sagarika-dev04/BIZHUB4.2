import mongoose, { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: {
      type: String,
      enum: ["General User", "Business Owner", "Admin"],
      default: "General User",
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "BusinessCard" }],
  },
  { timestamps: true,
    collection: "User",
   }
);

export const User = models.User || model("User", userSchema);
