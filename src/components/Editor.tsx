import { useState, useEffect } from "react";
import {
  Block,
  TextBlock as TextBlockType,
  ImageBlock as ImageBlockType,
} from "../types/blocks";
import { TextBlock } from "./TextBlock";
import { ImageBlock } from "./ImageBlock";
import { BlockStore } from "../store/blocks";
import { Notification } from "./Notification";

const getErrorMessage = (error: Error): string => {
  if (error.message.includes("network") || error.message.includes("fetch")) {
    return "Unable to connect to the server. Please check your internet connection.";
  }
  if (error.message.includes("not found")) {
    return "The requested block could not be found.";
  }
  return "An unexpected error occurred. Please try again.";
};

export const Editor = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (blockId: string) => {
    setDraggedItem(blockId);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (targetBlockId: string) => {
    if (!draggedItem || draggedItem === targetBlockId) return;
    const draggedIndex = blocks.findIndex((index) => {
      return index.id === draggedItem;
    });
    const targetBlockIdIndex = blocks.findIndex((index) => {
      return index.id === targetBlockId;
    });

    const newBlocks = [...blocks];
    const [draggedBlock] = newBlocks.splice(draggedIndex, 1);
    newBlocks.splice(targetBlockIdIndex, 0, draggedBlock);

    setBlocks(newBlocks);

    saveBlockOrder(newBlocks);
  };

  const saveBlockOrder = async (blocks: Block[]) => {
    try {
      await BlockStore.updateBlockOrder(blocks);
      showNotification("Block order updated successfully!", "success");
    } catch (error) {
      if (error instanceof Error) {
        showNotification(getErrorMessage(error), "error");
      }
    }
  };

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    // Auto-dismiss after 3 seconds
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    loadBlocks();
  }, []);

  const loadBlocks = async () => {
    try {
      setIsLoading(true);
      const loadedBlocks = await BlockStore.getBlocks();
      setBlocks(loadedBlocks);
    } catch (error) {
      if (error instanceof Error) {
        showNotification(getErrorMessage(error), "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateBlock = async (updatedBlock: Block) => {
    try {
      const savedBlock = await BlockStore.saveBlock(updatedBlock);
      setBlocks(
        blocks.map((block) => (block.id === savedBlock.id ? savedBlock : block))
      );
      showNotification("Changes saved successfully!", "success");
    } catch (error) {
      if (error instanceof Error) {
        showNotification(getErrorMessage(error), "error");
      }
    }
  };

  const addNewBlock = async (type: "text" | "image") => {
    try {
      const newBlock =
        type === "text"
          ? {
              type: "text" as const,
              content: "New text block",
              headingType: "paragraph" as const,
            }
          : {
              type: "image" as const,
              src: "",
              width: 400,
              height: 300,
            };

      const createdBlock = await BlockStore.createBlock(newBlock);
      setBlocks([...blocks, createdBlock]);
      showNotification(`New ${type} block added!`, "success");
    } catch (error) {
      if (error instanceof Error) {
        showNotification(getErrorMessage(error), "error");
      }
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.2rem",
          color: "#666",
        }}
      >
        Loading your content...
      </div>
    );
  }

  return (
    <div className="editor">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <div className="toolbar">
        <button onClick={() => addNewBlock("text")}>Add Text</button>
        <button onClick={() => addNewBlock("image")}>Add Image</button>
      </div>
      <div id="editorblocks" draggable="true" className="blocks">
        {blocks.map((block) =>
          block.type === "text" ? (
            <TextBlock
              key={block.id}
              block={block as TextBlockType}
              onUpdate={updateBlock}
              onDragStart={() => handleDragStart(block.id)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(block.id)}
            />
          ) : (
            <ImageBlock
              key={block.id}
              block={block as ImageBlockType}
              onUpdate={updateBlock}
              onDragStart={() => handleDragStart(block.id)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(block.id)}
            />
          )
        )}
      </div>
    </div>
  );
};
