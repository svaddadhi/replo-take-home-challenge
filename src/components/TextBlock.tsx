import { useState } from "react";
import { TextBlock as TextBlockType, HeadingType } from "../types/blocks";

interface TextBlockProps {
  block: TextBlockType;
  onUpdate: (block: TextBlockType) => void;
}

export const TextBlock = ({ block, onUpdate }: TextBlockProps) => {
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
    switch (headingType) {
      case "h1":
        return <h1 onClick={() => setIsEditing(true)}>{content}</h1>;
      case "h2":
        return <h2 onClick={() => setIsEditing(true)}>{content}</h2>;
      case "h3":
        return <h3 onClick={() => setIsEditing(true)}>{content}</h3>;
      case "paragraph":
      default:
        return <p onClick={() => setIsEditing(true)}>{content}</p>;
    }
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
