"use client";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Italic,
  Redo,
  Strikethrough,
  Underline,
  Undo,
  ListOrdered,
  CircleSmall,
  Highlighter,
} from "lucide-react";
import React, { useMemo } from "react";

const Toolbar = ({ editor }: any) => {
  const toolbarMemo = useMemo(() => {
    if (!editor) {
      return null;
    }

    return (
      <div className="flex gap-2 px-5 py-2 border mb-2  border-lightBorder dark:border-darkBorder  rounded">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200 cursor-pointer "
          title="Bold"
        >
          <Bold />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800  transition-colors duration-200  cursor-pointer "
          title="Italic"
        >
          <Italic />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800  transition-colors duration-200 cursor-pointer "
          title="Underline"
        >
          <Underline />
        </button>
        <button
          type="button"
          title="Highlight"
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#f8ff00" }).run()
          }
          className="px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800  transition-colors duration-200 cursor-pointer "
        >
          <Highlighter />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800  transition-colors duration-200 cursor-pointer "
          title="Strike Throught"
        >
          <Strikethrough />
        </button>
        <div className="border my-1 border-lightBorder dark:border-darkBorder"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className="px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800  transition-colors duration-200  cursor-pointer "
          title="Code"
        >
          <Code />
        </button>
        <div className="border my-1 border-lightBorder dark:border-darkBorder"></div>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800  transition-colors duration-200 cursor-pointer"
          title="Undo"
        >
          <Undo />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800  transition-colors duration-200 cursor-pointer"
          title="Redo"
        >
          <Redo />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className="px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800  transition-colors duration-200 cursor-pointer"
          title="Align Left"
        >
          <AlignLeft />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className="px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800  transition-colors duration-200 cursor-pointer"
          title="Align Center"
        >
          <AlignCenter />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className="px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800  transition-colors duration-200 cursor-pointer"
          title="Align Right"
        >
          <AlignRight />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className="px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800  transition-colors duration-200 cursor-pointer"
          title="Align Justify"
        >
          <AlignJustify />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800  transition-colors duration-200 cursor-pointer"
          title="Bullet List"
        >
          <CircleSmall />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800  transition-colors duration-200 cursor-pointer"
          title="Ordered List"
        >
          <ListOrdered />
        </button>
        <div className="border my-1 border-lightBorder dark:border-darkBorder"></div>
        <input
          type="color"
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
          className="h-auto w-10 cursor-pointer"
          title="color"
        />
      </div>
    );
  }, [editor]);

  return toolbarMemo;
};

export default Toolbar;
