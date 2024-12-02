import { Block } from "../types/blocks";

const STORAGE_KEY = "notion-blocks";

export const BlockStore = {
  getBlocks: (): Block[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveBlocks: (blocks: Block[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blocks));
  },
};
