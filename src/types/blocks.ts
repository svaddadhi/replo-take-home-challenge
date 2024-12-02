export type BlockType = "text" | "image";
export type HeadingType = "h1" | "h2" | "h3" | "paragraph";

export interface BaseBlock {
  id: string;
  type: BlockType;
}

export interface TextBlock extends BaseBlock {
  type: "text";
  content: string;
  headingType: HeadingType;
}

export interface ImageBlock extends BaseBlock {
  type: "image";
  src: string;
  width: number;
  height: number;
  alt?: string;
}

export type Block = TextBlock | ImageBlock;
