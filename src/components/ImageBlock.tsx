import { useState } from "react";
import { ImageBlock as ImageBlockType } from "../types/blocks";

interface ImageBlockProps {
  block: ImageBlockType;
  onUpdate: (block: ImageBlockType) => void;
}

export const ImageBlock = ({ block, onUpdate }: ImageBlockProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: block.width,
    height: block.height,
  });
  const [src, setSrc] = useState(block.src);

  const handleSave = () => {
    onUpdate({
      ...block,
      width: Number(dimensions.width),
      height: Number(dimensions.height),
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
          setDimensions((prev) => ({ ...prev, width: Number(e.target.value) }))
        }
        placeholder="Width"
      />
      <input
        type="number"
        value={dimensions.height}
        onChange={(e) =>
          setDimensions((prev) => ({ ...prev, height: Number(e.target.value) }))
        }
        placeholder="Height"
      />
      <button onClick={handleSave}>Save</button>
    </div>
  ) : (
    <div className="image-block">
      <img
        src={
          block.src ||
          `https://via.placeholder.com/${block.width}x${block.height}`
        }
        style={{
          width: `${block.width}px`,
          height: `${block.height}px`,
          objectFit: "cover",
        }}
        alt={block.alt || ""}
        onClick={() => setIsEditing(true)}
      />
    </div>
  );
};
