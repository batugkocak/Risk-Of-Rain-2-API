import dotenv from "dotenv";
dotenv.config();

import { config } from "./configs";
import server from "./server";

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
