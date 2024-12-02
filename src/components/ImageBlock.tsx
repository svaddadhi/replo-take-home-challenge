import { useState } from "react";
import { ImageBlock as ImageBlockType } from "../types/blocks";

interface ImageBlockProps {
  block: ImageBlockType;
  onUpdate: (block: ImageBlockType) => void;
}

export const ImageBlock = ({ block, onUpdate }: ImageBlockProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: block.width.toString(),
    height: block.height.toString(),
  });
  const [src, setSrc] = useState(block.src);

  const handleSave = () => {
    onUpdate({
      ...block,
      width: dimensions.width ? Number(dimensions.width) : 0,
      height: dimensions.height ? Number(dimensions.height) : 0,
      src,
    });
    setIsEditing(false);
  };

  return isEditing ? (
    <div className="image-block-editor">
      <input
        type="text"
        value={src}
        onChange={(e) => setSrc(e.target.value)}
        placeholder="Image URL"
      />
      <input
        type="number"
        value={dimensions.width}
        onChange={(e) =>
          setDimensions((prev) => ({ ...prev, width: e.target.value }))
        }
        placeholder="Width"
      />
      <input
        type="number"
        value={dimensions.height}
        onChange={(e) =>
          setDimensions((prev) => ({ ...prev, height: e.target.value }))
        }
        placeholder="Height"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  ) : (
    <div className="image-block" onClick={() => setIsEditing(true)}>
      {block.src ? (
        <img
          src={block.src}
          style={{
            width: `${block.width}px`,
            height: `${block.height}px`,
            objectFit: "cover",
          }}
          alt={block.alt || ""}
        />
      ) : (
        <div
          style={{
            width: `${block.width}px`,
            height: `${block.height}px`,
            border: "2px dashed #e5e7eb",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6b7280",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Click to add an image
        </div>
      )}
    </div>
  );
};
