/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import LinkExtension from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import History from "@tiptap/extension-history";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { common, createLowlight } from "lowlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Placeholder from "@tiptap/extension-placeholder";
import FontSize from "tiptap-extension-font-size";
import Toolbar from "./Toolbar";
import Highlight from "@tiptap/extension-highlight";

type Props = {
  description: (value: any) => void;
};

const lowlight = createLowlight(common);

const Editor = ({ description }: Props) => {
  const editor = useEditor({
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      description(html);
    },
    extensions: [
      StarterKit.configure({ history: false }),
      Underline,
      Italic,
      Bold,
      Code,
      Highlight.configure({ multicolor: true }),
      Strike,
      History,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      LinkExtension.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Write something here..." }),
      CodeBlockLowlight.configure({ lowlight }),
      TextStyle,
      Color,
      BulletList,
      OrderedList,
      FontSize.configure({
        types: ["textStyle"],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "shadow appearance-none min-h-[150px] border rounded w-full p-5 dark:text-white border-lightBorder dark:border-darkBorder text-black mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline",
      },
    },
  });

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent
        editor={editor}
        className="p-4 border rounded border-lightBorder dark:border-darkBorder"
      />
    </div>
  );
};

export default Editor;
