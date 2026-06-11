import dotenv from "dotenv";
import path from "path";

const configEnvPath = path.resolve(
  __dirname,
  "../../../packages/config/.env",
);
dotenv.config({ path: configEnvPath });
