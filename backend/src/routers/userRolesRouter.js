import express from "express";
import {
  createUserRole,
  deleteUserRole,
  getUserRoleById,
  getUserRoles,
  updateUserRole,
} from "../services/userRolesService";

const userRolesRouter = express.Router();

userRolesRouter.get("/", async (req, res) => {
  res.json(await getUserRoles());
});

userRolesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await getUserRoleById(id));
});

userRolesRouter.post("/", async (req, res) => {
  const userRole = req.body;
  res.json(await createUserRole(userRole));
});

userRolesRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const userRole = req.body;
  res.json(await updateUserRole(id, userRole));
});

userRolesRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await deleteUserRole(id));
});

export default userRolesRouter;
