import { Page } from '~/features/editor/types';
import { useEditor } from '~/features/editor/stores/editor';
import React from 'react';

export interface EditorProps {
  page: Page;
}

export function Editor({ page }: EditorProps) {
  const { ejsInstance } = useEditor();

  return (
    <div className="flex-1 relative">
      <div className="absolute inset-0 overflow-auto p-20" id="editorjs"></div>
    </div>
  );
}
