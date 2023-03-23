import { userSchema } from "../models/userModel";
import mongoose from "mongoose";

const userModel = mongoose.model("User", userSchema);

export const getUsers = async () => {
  const users = await userModel.find({}).populate(["role", "roles"]);
  return users;
};

export const getUserById = async (id) => {
  return await userModel.findById(id).populate(["role", "roles"]);
};

export const createUser = async (user) => {
  const createdUser = await userModel.create(user);
  return await createdUser.populate(["role", "roles"]);
};

export const updateUser = async (id, user) => {
  return await userModel
    .findByIdAndUpdate(id, user, { new: true })
    .populate(["role", "roles"]);
};

export const deleteUser = async (id) => {
  return await userModel.findByIdAndDelete(id);
};
