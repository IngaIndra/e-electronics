import { userSchema } from "../models/userModel";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userModel = mongoose.model("User", userSchema);

export const registerUser = async ({ email, password }) => {
  password = await bcrypt.hash(password, 10);
  const user = await createUser({ email, password, name: email.split("@")[0] });
  return user;
};

export const loginUser = async ({ email, password }) => {
  if (!email) {
    return { success: false, status: 400, message: "Email required" };
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    return { success: false, status: 400, message: "User not found" };
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { success: false, status: 400, message: "Password not matching" };
  }
  const token = jwt.sign({ _id: user._id, email: user.email }, "321890", {
    expiresIn: "2h",
  });

  return {
    success: true,
    status: 200,
    message: "Login success",
    body: { user, token },
  };
};

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
