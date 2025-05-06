/* eslint-disable @typescript-eslint/no-explicit-any */

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
  Type,
  ChevronDown,
} from "lucide-react";
import React, { useMemo, useState } from "react";

const Toolbar = ({ editor }: any) => {
  const [showFontSizes, setShowFontSizes] = useState(false);

  const fontSizes = useMemo(() => [
    { label: "H1", value: "32px" },
    { label: "H2", value: "24px" },
    { label: "H3", value: "18.72px" },
    { label: "H4", value: "16px" },
    { label: "H5", value: "13.28px" },
    { label: "H6", value: "	10.72px" },
  ], []);

  const toolbarMemo = useMemo(() => {
    if (!editor) {
      return null;
    }

    return (
      <div className="flex flex-wrap gap-2 px-5 py-2 mb-2 border rounded border-lightBorder dark:border-darkBorder">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200 cursor-pointer ${editor.isActive("bold") ? "bg-neutral-200 dark:bg-neutral-800" : ""
            }`}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200 cursor-pointer ${editor.isActive("italic")
            ? "bg-neutral-200 dark:bg-neutral-800"
            : ""
            }`}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200 cursor-pointer ${editor.isActive("underline")
            ? "bg-neutral-200 dark:bg-neutral-800"
            : ""
            }`}
          title="Underline"
        >
          <Underline size={18} />
        </button>
        <button
          type="button"
          title="Highlight"
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#f8ff00" }).run()
          }
          className={`px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200 cursor-pointer ${editor.isActive("highlight")
            ? "bg-neutral-200 dark:bg-neutral-800"
            : ""
            }`}
        >
          <Highlighter size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200 cursor-pointer ${editor.isActive("strike")
            ? "bg-neutral-200 dark:bg-neutral-800"
            : ""
            }`}
          title="Strike Through"
        >
          <Strikethrough size={18} />
        </button>

        <div className="my-1 border border-lightBorder dark:border-darkBorder"></div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowFontSizes(!showFontSizes)}
            className="flex items-center gap-1 px-2 py-1 transition-colors duration-200 rounded cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 "
            title="Font Size"
          >
            <Type size={18} />
            <ChevronDown size={14} />
          </button>

          {showFontSizes && (
            <div className="absolute left-0 z-10 p-1 mt-1 bg-white border rounded shadow-md top-full dark:bg-neutral-900 border-lightBorder dark:border-darkBorder">
              {fontSizes.map((size) => (
                <button
                  key={size.value}
                  type="button"
                  onClick={() => {
                    editor.chain().focus().setFontSize(size.value).run();
                    setShowFontSizes(false);
                  }}
                  className="block w-full px-2 py-1 text-sm text-left rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  style={{ fontSize: 15 }}
                >
                  {size.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200 cursor-pointer ${editor.isActive("code") ? "bg-neutral-200 dark:bg-neutral-800" : ""
            }`}
          title="Code"
        >
          <Code size={18} />
        </button>

        <div className="my-1 border border-lightBorder dark:border-darkBorder"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="px-2 py-1 transition-colors duration-200 rounded cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800"
          title="Undo"
        >
          <Undo size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="px-2 py-1 transition-colors duration-200 rounded cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800"
          title="Redo"
        >
          <Redo size={18} />
        </button>

        <div className="my-1 border border-lightBorder dark:border-darkBorder"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200 cursor-pointer ${editor.isActive({ textAlign: "left" })
            ? "bg-neutral-200 dark:bg-neutral-800"
            : ""
            }`}
          title="Align Left"
        >
          <AlignLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200 cursor-pointer ${editor.isActive({ textAlign: "center" })
            ? "bg-neutral-200 dark:bg-neutral-800"
            : ""
            }`}
          title="Align Center"
        >
          <AlignCenter size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200 cursor-pointer ${editor.isActive({ textAlign: "right" })
            ? "bg-neutral-200 dark:bg-neutral-800"
            : ""
            }`}
          title="Align Right"
        >
          <AlignRight size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200 cursor-pointer ${editor.isActive({ textAlign: "justify" })
            ? "bg-neutral-200 dark:bg-neutral-800"
            : ""
            }`}
          title="Align Justify"
        >
          <AlignJustify size={18} />
        </button>

        <div className="my-1 border border-lightBorder dark:border-darkBorder"></div>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200 cursor-pointer ${editor.isActive("bulletList")
            ? "bg-neutral-200 dark:bg-neutral-800"
            : ""
            }`}
          title="Bullet List"
        >
          <CircleSmall size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200 cursor-pointer ${editor.isActive("orderedList")
            ? "bg-neutral-200 dark:bg-neutral-800"
            : ""
            }`}
          title="Ordered List"
        >
          <ListOrdered size={18} />
        </button>

        <div className="my-1 border border-lightBorder dark:border-darkBorder"></div>

        <input
          type="color"
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
          className="w-10 h-auto cursor-pointer"
          title="Text Color"
        />
      </div>
    );
  }, [editor, showFontSizes, fontSizes]);

  return toolbarMemo;
};

export default Toolbar;
