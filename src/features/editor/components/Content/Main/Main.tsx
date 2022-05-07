import React, { useEffect, useLayoutEffect, useRef } from 'react';
import EditorJS, { API, OutputBlockData } from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from './editorTools';
import { usePages } from '~/features/editor/stores/pages';
import { useUpdateEffect } from 'react-use';

export interface EditorProps {}

export function Main(props: EditorProps) {
  const { selectedPageId } = usePages();
  const editorRef = useRef<EditorJS | null>(null);
  const editor = editorRef.current;
  const holderRef = useRef<HTMLDivElement | null>(null);
  const [blocks, setBlocks] = React.useState<OutputBlockData[]>([]);

  useLayoutEffect(() => {
    if (editorRef.current) return;

    editorRef.current = holderRef.current
      ? new EditorJS({
          holder: holderRef.current,
          tools: EDITOR_JS_TOOLS,
        })
      : null;
  }, []);

  useEffect(() => {
    if (!selectedPageId || !editor) return;

    // @ts-ignore
    if (editor.configuration !== undefined)
      // @ts-ignore
      editor.configuration.onChange = async (api: API) => {
        const { blocks } = await api.saver.save();

        // TODO: Save blocks to server.

        setBlocks((prevBlocks) => {
          if (JSON.stringify(prevBlocks) === JSON.stringify(blocks))
            return prevBlocks;
          return blocks;
        });
      };

    // TODO: Fetch blocks from server.

    editor.clear();
    setBlocks((prevBlocks) => {
      if (prevBlocks.length > 0) return [];
      return prevBlocks;
    });
  }, [editor, selectedPageId]);

  useUpdateEffect(() => {
    console.log(blocks);
  }, [blocks]);

  return (
    <div className="flex-1 relative">
      <div
        style={{
          visibility: selectedPageId ? 'visible' : 'hidden',
        }}
        ref={holderRef}
        className="absolute inset-0 overflow-auto p-20"
      ></div>
    </div>
  );
}
