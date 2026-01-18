import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/ai/knowledge.json");

export function loadKnowledge() {
  if (!fs.existsSync(filePath)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function saveKnowledge(knowledge) {
  fs.writeFileSync(
    filePath,
    JSON.stringify(knowledge, null, 2),
    "utf-8"
  );
}
