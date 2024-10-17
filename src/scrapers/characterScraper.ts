import axios from "axios";
import * as cheerio from "cheerio";
import Character from "../models/character";

export async function getCharacters() {
  const basePage = "https://riskofrain2.fandom.com";
  const page = basePage + "/wiki/Survivors";

  const { data: html } = await axios.get(page);
  const $ = cheerio.load(html);

  const $targetTable = $(".wikitable.sortable tbody");

  const characters: Character[] = [];

  $targetTable.find("tr").each((index, element) => {
    const $row = $(element).find("td");

    if ($row.length === 0) return;

    const image = $row.eq(0).find("img").attr("data-src") || "";
    const name =
      image.split("/")[7].replace(".png", "").replace("_", " ") || "";
    const health = $row.eq(2).text().trim();
    const damage = $row.eq(3).text().trim();
    const healthRegen = $row.eq(4).text().trim();
    const survivorClass = $row.eq(5).text().trim();
    const armor = $row.eq(6).text().trim();
    const movementSpeed = $row.eq(7).text().trim();
    const mass = $row.eq(8).text().trim();

    const newCharacter = new Character(
      image,
      name,
      health,
      damage,
      healthRegen,
      survivorClass,
      armor,
      movementSpeed,
      mass
    );

    characters.push(newCharacter);
  });

  return characters;
}
