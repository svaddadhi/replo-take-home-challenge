import { useState, useEffect } from "react";
import {
  Block,
  TextBlock as TextBlockType,
  ImageBlock as ImageBlockType,
} from "../types/blocks";
import { TextBlock } from "./TextBlock";
import { ImageBlock } from "./ImageBlock";
import { BlockStore } from "../store/blocks";

export const Editor = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    setBlocks(BlockStore.getBlocks());
  }, []);

  const updateBlock = (updatedBlock: Block) => {
    const newBlocks = blocks.map((block) =>
      block.id === updatedBlock.id ? updatedBlock : block
    );
    setBlocks(newBlocks);
    BlockStore.saveBlocks(newBlocks);
  };

  const addNewBlock = (type: "text" | "image") => {
    const newBlock: Block =
      type === "text"
        ? {
            id: Date.now().toString(),
            type: "text",
            content: "New text block",
            headingType: "paragraph",
          }
        : {
            id: Date.now().toString(),
            type: "image",
            src: "",
            width: 200,
            height: 200,
          };

    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    BlockStore.saveBlocks(newBlocks);
  };

  return (
    <div className="editor">
      <div className="toolbar">
        <button onClick={() => addNewBlock("text")}>Add Text</button>
        <button onClick={() => addNewBlock("image")}>Add Image</button>
      </div>
      <div className="blocks">
        {blocks.map((block) =>
          block.type === "text" ? (
            <TextBlock
              key={block.id}
              block={block as TextBlockType}
              onUpdate={updateBlock}
            />
          ) : (
            <ImageBlock
              key={block.id}
              block={block as ImageBlockType}
              onUpdate={updateBlock}
            />
          )
        )}
      </div>
    </div>
  );
};
