import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

const DB_PATH = path.join(__dirname, "data", "blocks.json");

app.use(cors());
app.use(bodyParser.json());

async function readBlocks() {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data).blocks;
  } catch (error) {
    console.error("Error reading blocks:", error);
    return [];
  }
}

async function writeBlocks(blocks: any[]) {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify({ blocks }, null, 2));
  } catch (error) {
    console.error("Error writing blocks:", error);
    throw error;
  }
}

app.get("/api/blocks", async (req, res) => {
  try {
    const blocks = await readBlocks();
    res.json(blocks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blocks" });
  }
});

app.post("/api/blocks", async (req, res) => {
  try {
    const blocks = await readBlocks();
    const newBlock = {
      ...req.body,
      id: Date.now().toString(), // Create a unique ID using timestamp
    };
    blocks.push(newBlock);
    await writeBlocks(blocks);
    res.status(201).json(newBlock);
  } catch (error) {
    res.status(500).json({ error: "Failed to create block" });
  }
});

app.put("/api/blocks/reorder", async (req, res) => {
  try {
    console.log("request body: ", req.body);
    const { blocks } = req.body;
    await writeBlocks(blocks);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("failing to persist:", error);
    res.status(500).json({ error: "Failed to rearrange blocks" });
  }
});

app.put("/api/blocks/:id", async (req, res) => {
  try {
    const blocks = await readBlocks();
    const index = blocks.findIndex((block) => block.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: "Block not found" });
    }

    blocks[index] = { ...blocks[index], ...req.body };
    await writeBlocks(blocks);
    res.json(blocks[index]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update block" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api/blocks`);
});
