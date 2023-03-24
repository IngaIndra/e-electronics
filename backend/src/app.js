import express, { json } from "express";
import cors from "cors";
import * as mongooseConfig from "./configs/mongoose-config";
import usersRouter from "./routers/usersRouter";
import userRolesRouter from "./routers/userRolesRouter";
import { loginUser, registerUser } from "./services/usersService";

import multer from "multer";
import { v4 as uuid } from "uuid";
import cloudinary from "cloudinary";

const PORT = 8080;
const app = express();

app.use(json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/tmp");
  },
  filename: (req, file, cb) => {
    const fileName = uuid();
    const splittedPath = file.originalname.split(".");
    const fileExtension = splittedPath[splittedPath.length - 1];
    cb(null, `${fileName}.${fileExtension}`);
  },
});

cloudinary.config({
  cloud_name: "df8az1u5k",
  api_key: "792374388872524",
  api_secret: "9TvZ89y4BmTTvNM5TY1Gyiasqtc",
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image") || file.mimetype.includes("video")) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

app.get("/api/", (req, res) => {
  res.json("Hello world!");
});

app.use("/api/users", usersRouter);
app.use("/api/userRoles", userRolesRouter);

app.post("/api/register", async (req, res) => {
  const { email, password, repassword } = req.body;
  if (password !== repassword) {
    return res
      .status(400)
      .json({ success: false, message: "Password did not match" });
  }
  const user = await registerUser({ email, password });
  console.log("user:", user);
  return res
    .status(200)
    .json({ success: true, message: "Registered successful" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const response = await loginUser({ email, password });
  res.status(response.status).json(response);
});

app.post("/files", upload.single("image"), async (req, res) => {
  const uploadedFile = await cloudinary.v2.uploader.upload(req.file.path);
  res.json(uploadedFile);
});

app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
