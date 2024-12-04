import { useState } from "react";
import { TextBlock as TextBlockType, HeadingType } from "../types/blocks";

interface TextBlockProps {
  block: TextBlockType;
  onUpdate: (block: TextBlockType) => void;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: () => void;
}

export const TextBlock = ({
  block,
  onUpdate,
  onDragStart,
  onDragOver,
  onDrop,
}: TextBlockProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(block.content);
  const [headingType, setHeadingType] = useState<HeadingType>(
    block.headingType
  );

  const handleSave = () => {
    onUpdate({ ...block, content, headingType });
    setIsEditing(false);
  };

  const renderElement = () => {
    const dragProps = {
      draggable: true,
      onDragStart,
      onDragOver,
      onDrop,
      style: { cursor: "move" },
    };
    switch (headingType) {
      case "h1":
        return (
          <h1 {...dragProps} onClick={() => setIsEditing(true)}>
            {content}
          </h1>
        );
      case "h2":
        return (
          <h2 {...dragProps} onClick={() => setIsEditing(true)}>
            {content}
          </h2>
        );
      case "h3":
        return (
          <h3 {...dragProps} onClick={() => setIsEditing(true)}>
            {content}
          </h3>
        );
      case "paragraph":
      default:
        return (
          <p {...dragProps} onClick={() => setIsEditing(true)}>
            {content}
          </p>
        );
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text", e.currentTarget.id);
  };

  const enableDropping = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("text");
  };

  return isEditing ? (
    <div className="text-block-editor">
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <select
          value={headingType}
          onChange={(e) => setHeadingType(e.target.value as HeadingType)}
        >
          <option value="paragraph">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        autoFocus
      />
    </div>
  ) : (
    renderElement()
  );
};
