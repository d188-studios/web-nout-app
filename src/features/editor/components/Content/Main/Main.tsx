import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useEventEmitter } from '~/lib/eventemitter';
import { Page } from '~/features/editor/types';
import EditorJS, { API } from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from './editorTools';

export interface EditorProps {}

const BLOCK_PAGE_TITLE_ID = 'pageTitle';

export function Main(props: EditorProps) {
  const { addListener, emit } = useEventEmitter();
  const editorRef = useRef<EditorJS | null>(null);
  const [page, setPage] = React.useState<Page | null>(null);
  const pageTitleRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (editorRef.current) return;

    editorRef.current = new EditorJS({
      holder: 'editorjs',
      tools: EDITOR_JS_TOOLS,
    });
  }, []);

  useEffect(() => {
    // return addListener<Page>('openPage', (page) => {
    //   setPage(page);

    //   if (!editorRef.current) return;
    //   const editor = editorRef.current;

    //   // @ts-ignore
    //   editor.configuration.onChange = async (api: API) => {
    //     // const { blocks } = await api.saver.save();

    //     // const found = blocks.find((block) => block.id === BLOCK_PAGE_TITLE_ID);
    //     // if (!found) return;

    //     // emit('updatePage', {
    //     //   page,
    //     //   editedPage: {
    //     //     title: found.data.text,
    //     //   },
    //     // });
    //   };

    //   editor.blocks.render({
    //     blocks: [
    //       {
    //         id: BLOCK_PAGE_TITLE_ID,
    //         type: 'header',
    //         data: {
    //           text: page.title,
    //           level: 1,
    //         },
    //       },
    //     ],
    //   });
    // });
  }, [addListener, emit]);

  // useEffect(() => {
  //   return addListener<Page>('openPage', (page) => {
  //     instanceCountRef.current += 1;
  //     const instanceId = instanceCountRef.current;

  //     // if (ejsInstanceRef.current && !loadingRef.current) {
  //     //   ejsInstanceRef.current.destroy();
  //     //   ejsInstanceRef.current = null;
  //     // }

  //     pageTitleRef.current = page.title;
  // const newInstance = new EditorJS({
  //   holder: 'editorjs',
  //   tools: EDITOR_JS_TOOLS,
  //   onReady: () => {
  //     if(instanceId !== instanceCountRef.current)
  //       newInstance.destroy();
  //   },
  //   onChange: async (api) => {
  //     const { blocks } = await api.saver.save();

  //         const found = blocks.find(
  //           (block) => block.id === BLOCK_PAGE_TITLE_ID
  //         );
  //         if (found) {
  //           if (found.data.text !== pageTitleRef.current) {
  //             pageTitleRef.current = found.data.text;
  //             emit('updatePage', {
  //               page,
  //               editedPage: {
  //                 title: found.data.text,
  //               },
  //             });
  //           }
  //         }
  //       },
  //       data: {
  //         blocks: [
  //           {
  //             id: BLOCK_PAGE_TITLE_ID,
  //             type: 'header',
  //             data: {
  //               text: page.title,
  //               level: 1,
  //             },
  //           },
  //         ],
  //       },
  //     });

  //     ejsInstanceRef.current = newInstance;
  //   });
  // }, [addListener, emit]);

  useEffect(() => {
    const removeUpdatePageListener = addListener<Page>(
      'updateOpenPage',
      (updatedPage) => {
        setPage(updatedPage);
        // if (!editorRef.current) return;

        // if (pageTitleRef.current === updatedPage.title) return;
        // console.log(pageTitleRef.current, updatedPage.title);
        // pageTitleRef.current = updatedPage.title;

        // editorRef.current.blocks.update(BLOCK_PAGE_TITLE_ID, {
        //   text: updatedPage.title,
        //   level: 1,
        // });
      }
    );

    const removeDeletePageListener = addListener('deleteOpenPage', () => {
      if (!editorRef.current) return;
      setPage(null);
      editorRef.current.blocks.clear();
    });

    return () => {
      removeUpdatePageListener();
      removeDeletePageListener();
    };
  }, [addListener]);

  return (
    <div className="flex-1 relative">
      <div
        style={{
          visibility: page ? 'visible' : 'hidden',
        }}
        className="absolute inset-0 overflow-auto p-20"
        id="editorjs"
      ></div>
    </div>
  );
}
