"use client";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Code, Italic, Redo, Strikethrough, Underline, Undo } from "lucide-react";
import React, { useMemo } from "react";

const Toolbar = ({ editor }: any) => {
  const toolbarMemo = useMemo(() => {
    if (!editor) {
      return null;
    }

    return (
      <div className="flex gap-2 px-5 py-2 border mb-2  border-lightBorder dark:border-darkBorder ">
        <button type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded hover:bg-gray-100 transition-colors duration-200 ${editor.isActive("bold") ? "bg-gray-200" : ""
            }`}
        >
          <Bold />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded hover:bg-gray-100 transition-colors duration-200 ${editor.isActive("italic") ? "bg-gray-200" : ""
            }`}
        >
          <Italic />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 rounded hover:bg-gray-100 transition-colors duration-200 ${editor.isActive("underline") ? "bg-gray-200" : ""
            }`}
        >
          <Underline />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 py-1 rounded hover:bg-gray-100 transition-colors duration-200 ${editor.isActive("strike") ? "bg-gray-200" : ""
            }`}
        >
          <Strikethrough />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`px-2 py-1 rounded hover:bg-gray-100 transition-colors duration-200 ${editor.isActive("code") ? "bg-gray-200" : ""
            }`}
        >
          <Code />
        </button>

        <button type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="px-2 py-1 rounded hover:bg-gray-100 transition-colors duration-200"
        >
          <Undo />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="px-2 py-1 rounded hover:bg-gray-100 transition-colors duration-200"
        >
          <Redo />
        </button>

        <button type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className="px-2 py-1 rounded hover:bg-gray-100 transition-colors duration-200"
        >
          <AlignLeft />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className="px-2 py-1 rounded hover:bg-gray-100 transition-colors duration-200"
        >
          <AlignCenter />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className="px-2 py-1 rounded hover:bg-gray-100 transition-colors duration-200"
        >
          <AlignRight />
        </button>
        <button type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className="px-2 py-1 rounded hover:bg-gray-100 transition-colors duration-200"
        >
          <AlignJustify />
        </button>
        <input
          type="color"
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
          className="h-auto w-10"
          title="color"
        />
      </div>
    );
  }, [editor]);

  return toolbarMemo;
};

export default Toolbar;