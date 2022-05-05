import React, { useEffect, useRef } from 'react';
import { useEventEmitter } from '~/lib/eventemitter';
import { Page } from '~/features/editor/types';
import EditorJS from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from './editorTools';

export interface EditorProps {}

const BLOCK_PAGE_TITLE_ID = 'pageTitle';

export function Editor(props: EditorProps) {
  const { addListener, emit } = useEventEmitter();
  const ejsInstanceRef = useRef<EditorJS | null>(null);
  const pageTitleRef = useRef<string | null>(null);

  useEffect(() => {
    return addListener<Page>('openPage', (page) => {
      if (ejsInstanceRef.current) {
        ejsInstanceRef.current.destroy();
        ejsInstanceRef.current = null;
      }

      pageTitleRef.current = page.title;

      ejsInstanceRef.current = new EditorJS({
        holder: 'editorjs',
        tools: EDITOR_JS_TOOLS,
        onChange: async (api) => {
          const { blocks } = await api.saver.save();

          const found = blocks.find(
            (block) => block.id === BLOCK_PAGE_TITLE_ID
          );
          if (found) {
            if (found.data.text !== pageTitleRef.current) {
              pageTitleRef.current = found.data.text;
              emit('updatePage', {
                page,
                editedPage: {
                  title: found.data.text,
                },
              });
            }
          }
        },
        data: {
          blocks: [
            {
              id: BLOCK_PAGE_TITLE_ID,
              type: 'header',
              data: {
                text: page.title,
                level: 1,
              },
            },
          ],
        },
      });
    });
  }, [addListener, emit]);

  useEffect(() => {
    const removeUpdatePageListener = addListener<Page>(
      'updateOpenPage',
      (updatedPage) => {
        if (!ejsInstanceRef.current) return;
        if (updatedPage.title === pageTitleRef.current) return;

        ejsInstanceRef.current.blocks.update(BLOCK_PAGE_TITLE_ID, {
          text: updatedPage.title,
        });
      }
    );

    const removeDeletePageListener = addListener('deleteOpenPage', () => {
      if (!ejsInstanceRef.current) return;

      ejsInstanceRef.current.destroy();
      ejsInstanceRef.current = null;
    });

    return () => {
      removeUpdatePageListener();
      removeDeletePageListener();
    };
  }, [addListener]);

  return (
    <div className="flex-1 relative">
      <div className="absolute inset-0 overflow-auto p-20" id="editorjs"></div>
    </div>
  );
}
