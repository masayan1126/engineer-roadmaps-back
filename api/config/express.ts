import express, { Application } from "express";
import cors from "cors";
import sample from "../modules/sample";
import user from "../modules/user/routes/user";
import loadmap from "../modules/loadMap/loadmap";

const app: Application = express();

app.use(express.json());
const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

/**
 * @see https://www.twilio.com/ja/blog/add-cors-support-express-typescript-api-jp
 */
app.use(cors(options));

app.use("/", sample);
app.use("/users", user);
app.use("/loadmaps", loadmap);

export default app;
