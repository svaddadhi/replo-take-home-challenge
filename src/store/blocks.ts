import { Block } from "../types/blocks";

const API_URL = "http://localhost:3001/api";

export const BlockStore = {
  getBlocks: async (): Promise<Block[]> => {
    try {
      const response = await fetch(`${API_URL}/blocks`);
      if (!response.ok) {
        throw new Error("Failed to fetch blocks");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching blocks:", error);
      return [];
    }
  },

  saveBlock: async (block: Block): Promise<Block> => {
    try {
      const response = await fetch(`${API_URL}/blocks/${block.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(block),
      });
      if (!response.ok) {
        throw new Error("Failed to save block");
      }
      return await response.json();
    } catch (error) {
      console.error("Error saving block:", error);
      throw error;
    }
  },

  createBlock: async (block: Omit<Block, "id">): Promise<Block> => {
    try {
      const response = await fetch(`${API_URL}/blocks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(block),
      });
      if (!response.ok) {
        throw new Error("Failed to create block");
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating block:", error);
      throw error;
    }
  },
};
