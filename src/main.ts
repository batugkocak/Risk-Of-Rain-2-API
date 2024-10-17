import dotenv from "dotenv";
dotenv.config();

import { config } from "./configs";
import server from "./server";
import { getCharacters } from "./scrapers/characterScraper";

server.get("/characters", async (req, res) => {
  try {
    const characters = await getCharacters();
    res.send({
      statusCode: 200,
      data: characters,
      message: "Characters fetched successfully",
    });
  } catch {
    res.status(500).send("Error fetching the data");
  }
});

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
